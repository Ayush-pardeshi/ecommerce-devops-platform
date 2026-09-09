#!/bin/bash

set -u

PROJECT_DIR="/home/ubuntu/ecommerce-devops-platform"
AWS_REGION="eu-north-1"
AWS_ACCOUNT_ID="121754142251"

IMAGE_TAG="${1:-}"

if [ -z "$IMAGE_TAG" ]; then
  echo "ERROR: Image tag is required."
  echo "Usage: ./scripts/deploy.sh <image-tag>"
  exit 1
fi

BACKEND_IMAGE="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/ecommerce-backend"
FRONTEND_IMAGE="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/ecommerce-frontend"

ROLLBACK_TAG=""

echo "========================================"
echo "Starting E-Commerce deployment"
echo "New image tag: $IMAGE_TAG"
echo "========================================"

cd "$PROJECT_DIR"


# =========================================================
# FUNCTION: HEALTH CHECK
# =========================================================

run_health_checks() {

  echo "Waiting for backend to become healthy..."

  local BACKEND_STATUS=""

  for i in {1..30}; do

    BACKEND_STATUS=$(docker inspect \
      --format '{{.State.Health.Status}}' \
      ecommerce-backend 2>/dev/null || echo "missing")

    echo "Attempt $i/30 - Backend health: $BACKEND_STATUS"

    if [ "$BACKEND_STATUS" = "healthy" ]; then
      break
    fi

    if [ "$BACKEND_STATUS" = "unhealthy" ]; then
      echo "ERROR: Backend became unhealthy."
      docker logs ecommerce-backend --tail 80
      return 1
    fi

    sleep 5

  done

  if [ "$BACKEND_STATUS" != "healthy" ]; then
    echo "ERROR: Backend did not become healthy within 150 seconds."
    docker logs ecommerce-backend --tail 80
    return 1
  fi


  echo "[1/3] Checking frontend..."

  if ! curl --fail --silent --show-error \
    http://127.0.0.1/ \
    > /dev/null
  then
    echo "ERROR: Frontend health check failed."
    return 1
  fi

  echo "Frontend: OK"


  echo "[2/3] Checking backend health..."

  if ! curl --fail --silent --show-error \
    http://127.0.0.1/api/health \
    > /dev/null
  then
    echo "ERROR: Backend health endpoint failed."
    return 1
  fi

  echo "Backend health: OK"


  echo "[3/3] Checking products API..."

  if ! curl --fail --silent --show-error \
    http://127.0.0.1/api/products \
    > /dev/null
  then
    echo "ERROR: Products API check failed."
    return 1
  fi

  echo "Products API: OK"

  return 0
}


# =========================================================
# FUNCTION: FIND CURRENT PRODUCTION SHA
# =========================================================

find_current_production_tag() {

  local BACKEND_DIGEST
  local FRONTEND_DIGEST
  local BACKEND_TAG
  local FRONTEND_TAG

  echo "Detecting currently running production version..."

  BACKEND_DIGEST=$(docker inspect \
    --format '{{index .RepoDigests 0}}' \
    ecommerce-backend:latest 2>/dev/null || true)

  FRONTEND_DIGEST=$(docker inspect \
    --format '{{index .RepoDigests 0}}' \
    ecommerce-frontend:latest 2>/dev/null || true)

  if [ -z "$BACKEND_DIGEST" ] || [ -z "$FRONTEND_DIGEST" ]; then
    echo "ERROR: Unable to determine current production image digest."
    return 1
  fi

  BACKEND_DIGEST="${BACKEND_DIGEST##*@}"
  FRONTEND_DIGEST="${FRONTEND_DIGEST##*@}"

  BACKEND_TAG=$(aws ecr describe-images \
    --region "$AWS_REGION" \
    --repository-name ecommerce-backend \
    --image-ids imageDigest="$BACKEND_DIGEST" \
    --query 'imageDetails[0].imageTags[?@ != `latest`] | [0]' \
    --output text 2>/dev/null || true)

  FRONTEND_TAG=$(aws ecr describe-images \
    --region "$AWS_REGION" \
    --repository-name ecommerce-frontend \
    --image-ids imageDigest="$FRONTEND_DIGEST" \
    --query 'imageDetails[0].imageTags[?@ != `latest`] | [0]' \
    --output text 2>/dev/null || true)

  if [ -z "$BACKEND_TAG" ] || [ "$BACKEND_TAG" = "None" ]; then
    echo "ERROR: Unable to determine current backend SHA."
    return 1
  fi

  if [ -z "$FRONTEND_TAG" ] || [ "$FRONTEND_TAG" = "None" ]; then
    echo "ERROR: Unable to determine current frontend SHA."
    return 1
  fi

  if [ "$BACKEND_TAG" != "$FRONTEND_TAG" ]; then
    echo "ERROR: Backend and frontend production versions do not match."
    echo "Backend:  $BACKEND_TAG"
    echo "Frontend: $FRONTEND_TAG"
    return 1
  fi

  ROLLBACK_TAG="$BACKEND_TAG"

  echo "Current production version: $ROLLBACK_TAG"
}


# =========================================================
# ECR LOGIN
# =========================================================

echo "[1/8] Logging in to Amazon ECR..."

if ! aws ecr get-login-password --region "$AWS_REGION" \
  | docker login \
      --username AWS \
      --password-stdin \
      "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
then
  echo "ERROR: ECR login failed."
  exit 1
fi


# =========================================================
# DETECT CURRENT VERSION
# =========================================================

echo "[2/8] Detecting rollback version..."

if ! find_current_production_tag; then
  echo "ERROR: Cannot safely determine rollback version."
  echo "Deployment stopped to protect the current production version."
  exit 1
fi

if [ "$ROLLBACK_TAG" = "$IMAGE_TAG" ]; then
  echo "Requested version is already running."
  echo "Nothing to deploy."
  exit 0
fi


# =========================================================
# PULL NEW IMAGES
# =========================================================

echo "[3/8] Pulling new backend image..."

if ! docker pull "${BACKEND_IMAGE}:${IMAGE_TAG}"; then
  echo "ERROR: Failed to pull new backend image."
  exit 1
fi


echo "[4/8] Pulling new frontend image..."

if ! docker pull "${FRONTEND_IMAGE}:${IMAGE_TAG}"; then
  echo "ERROR: Failed to pull new frontend image."
  exit 1
fi


# =========================================================
# TAG NEW IMAGES
# =========================================================

echo "[5/8] Tagging images for Docker Compose..."

docker tag \
  "${BACKEND_IMAGE}:${IMAGE_TAG}" \
  ecommerce-backend:latest

docker tag \
  "${FRONTEND_IMAGE}:${IMAGE_TAG}" \
  ecommerce-frontend:latest


# =========================================================
# DEPLOY NEW VERSION
# =========================================================

echo "[6/8] Deploying new production version..."

if ! docker compose \
  -f docker/docker-compose.yml \
  -f docker/docker-compose.prod.yml \
  up -d --no-build --remove-orphans frontend backend
then
  echo "ERROR: Docker Compose deployment failed."
  DEPLOYMENT_FAILED=1
else
  DEPLOYMENT_FAILED=0
fi


# =========================================================
# HEALTH CHECK NEW VERSION
# =========================================================

if [ "$DEPLOYMENT_FAILED" -eq 0 ]; then

  echo "[7/8] Running production health checks..."

  if run_health_checks; then

    echo ""
    echo "========================================"
    echo "NEW VERSION HEALTH CHECKS PASSED"
    echo "========================================"

  else

    echo ""
    echo "========================================"
    echo "NEW VERSION HEALTH CHECKS FAILED"
    echo "========================================"

    DEPLOYMENT_FAILED=1

  fi

fi


# =========================================================
# AUTOMATIC ROLLBACK
# =========================================================

if [ "$DEPLOYMENT_FAILED" -eq 1 ]; then

  echo ""
  echo "========================================"
  echo "AUTOMATIC ROLLBACK STARTED"
  echo "========================================"

  echo "Failed version:   $IMAGE_TAG"
  echo "Rollback version: $ROLLBACK_TAG"


  echo "[ROLLBACK 1/5] Pulling previous backend image..."

  if ! docker pull "${BACKEND_IMAGE}:${ROLLBACK_TAG}"; then
    echo "CRITICAL ERROR: Failed to pull rollback backend image."
    exit 1
  fi


  echo "[ROLLBACK 2/5] Pulling previous frontend image..."

  if ! docker pull "${FRONTEND_IMAGE}:${ROLLBACK_TAG}"; then
    echo "CRITICAL ERROR: Failed to pull rollback frontend image."
    exit 1
  fi


  echo "[ROLLBACK 3/5] Restoring previous image tags..."

  docker tag \
    "${BACKEND_IMAGE}:${ROLLBACK_TAG}" \
    ecommerce-backend:latest

  docker tag \
    "${FRONTEND_IMAGE}:${ROLLBACK_TAG}" \
    ecommerce-frontend:latest


  echo "[ROLLBACK 4/5] Starting previous production version..."

  if ! docker compose \
    -f docker/docker-compose.yml \
    -f docker/docker-compose.prod.yml \
    up -d --no-build --remove-orphans frontend backend
  then
    echo "CRITICAL ERROR: Rollback Docker Compose deployment failed."
    exit 1
  fi


  echo "[ROLLBACK 5/5] Verifying previous version..."

  if ! run_health_checks; then
    echo ""
    echo "========================================"
    echo "CRITICAL ERROR"
    echo "ROLLBACK HEALTH CHECKS FAILED"
    echo "========================================"

    docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Image}}\t{{.Ports}}'

    exit 1
  fi


  echo ""
  echo "========================================"
  echo "AUTOMATIC ROLLBACK SUCCESSFUL"
  echo "========================================"
  echo "Previous version restored: $ROLLBACK_TAG"
  echo "Website health checks: PASSED"
  echo "========================================"

  echo ""
  echo "The new deployment failed."
  echo "The previous working version is running."

  exit 1

fi


# =========================================================
# FINAL STATUS
# =========================================================

echo "[8/8] Final container status..."

docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Image}}\t{{.Ports}}'

echo ""
echo "========================================"
echo "DEPLOYMENT COMPLETED SUCCESSFULLY"
echo "========================================"
echo "Image tag: $IMAGE_TAG"
echo "Application health checks: PASSED"
echo "========================================"

#!/bin/bash

set -e

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

echo "========================================"
echo "Starting E-Commerce deployment"
echo "Image tag: $IMAGE_TAG"
echo "========================================"

cd "$PROJECT_DIR"

echo "[1/8] Logging in to Amazon ECR..."

aws ecr get-login-password --region "$AWS_REGION" \
  | docker login \
      --username AWS \
      --password-stdin \
      "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

echo "[2/8] Pulling backend image..."

docker pull "${BACKEND_IMAGE}:${IMAGE_TAG}"

echo "[3/8] Pulling frontend image..."

docker pull "${FRONTEND_IMAGE}:${IMAGE_TAG}"

echo "[4/8] Tagging images for Docker Compose..."

docker tag "${BACKEND_IMAGE}:${IMAGE_TAG}" ecommerce-backend:latest
docker tag "${FRONTEND_IMAGE}:${IMAGE_TAG}" ecommerce-frontend:latest

echo "[5/8] Updating application containers..."

docker compose \
  -f docker/docker-compose.yml \
  -f docker/docker-compose.prod.yml \
  up -d --no-build --remove-orphans frontend backend

echo "[6/8] Waiting for backend to become healthy..."

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
    exit 1
  fi

  sleep 5

done

if [ "$BACKEND_STATUS" != "healthy" ]; then
  echo "ERROR: Backend did not become healthy within 150 seconds."
  docker logs ecommerce-backend --tail 80
  exit 1
fi

echo "[7/8] Checking application endpoints..."

sleep 3

echo "Checking frontend..."

curl --fail --silent --show-error \
  http://127.0.0.1/ \
  > /dev/null

echo "Frontend: OK"

echo "Checking backend health..."

curl --fail --silent --show-error \
  http://127.0.0.1/api/health

echo ""

echo "Backend health: OK"

echo "Checking products API..."

curl --fail --silent --show-error \
  http://127.0.0.1/api/products \
  > /dev/null

echo "Products API: OK"

echo "[8/8] Final container status..."

docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Image}}\t{{.Ports}}'

echo ""
echo "========================================"
echo "Deployment completed successfully"
echo "Image tag: $IMAGE_TAG"
echo "Application health checks: PASSED"
echo "========================================"

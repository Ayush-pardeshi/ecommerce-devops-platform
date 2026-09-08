#!/bin/bash

set -e

PROJECT_DIR="/home/ubuntu/ecommerce-devops-platform"
AWS_REGION="eu-north-1"
AWS_ACCOUNT_ID="121754142251"

IMAGE_TAG="${1:-}"

if [ -z "$IMAGE_TAG" ]; then
  echo "ERROR: Image tag is required."
  echo "Usage: ./scripts/deploy-staging.sh <image-tag>"
  exit 1
fi

FRONTEND_IMAGE="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/ecommerce-frontend"

echo "========================================"
echo "Starting E-Commerce STAGING deployment"
echo "Image tag: $IMAGE_TAG"
echo "========================================"

cd "$PROJECT_DIR"

echo "[1/6] Logging in to Amazon ECR..."

aws ecr get-login-password --region "$AWS_REGION" \
  | docker login \
      --username AWS \
      --password-stdin \
      "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

echo "[2/6] Pulling frontend image..."

docker pull "${FRONTEND_IMAGE}:${IMAGE_TAG}"

echo "[3/6] Tagging image for staging..."

docker tag \
  "${FRONTEND_IMAGE}:${IMAGE_TAG}" \
  ecommerce-frontend:staging

echo "[4/6] Updating STAGING container..."

docker compose \
  -p ecommerce-staging \
  -f docker/docker-compose.staging.yml \
  up -d --no-build --remove-orphans

echo "[5/6] Checking staging application..."

sleep 3

echo "Checking staging frontend..."

curl --fail --silent --show-error \
  http://127.0.0.1:8081/ \
  > /dev/null

echo "Staging frontend: OK"

echo "Checking staging backend health..."

curl --fail --silent --show-error \
  http://127.0.0.1:8081/api/health

echo ""

echo "Staging backend health: OK"

echo "Checking staging products API..."

curl --fail --silent --show-error \
  http://127.0.0.1:8081/api/products \
  > /dev/null

echo "Staging products API: OK"

echo "[6/6] Final staging container status..."

docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Image}}\t{{.Ports}}'

echo ""
echo "========================================"
echo "STAGING deployment completed successfully"
echo "Image tag: $IMAGE_TAG"
echo "Staging health checks: PASSED"
echo "========================================"

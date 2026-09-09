#!/bin/bash

set -e

ZAP_IMAGE="ghcr.io/zaproxy/zaproxy:stable"

echo "========================================"
echo "Docker cleanup started"
echo "========================================"

echo "[1/4] Removing disposable ZAP image..."

if docker image inspect "$ZAP_IMAGE" >/dev/null 2>&1; then
    docker rmi "$ZAP_IMAGE" || true
    echo "ZAP image removed."
else
    echo "ZAP image not present."
fi

echo "[2/4] Removing unused local ECR images..."

for REPOSITORY in \
    "121754142251.dkr.ecr.eu-north-1.amazonaws.com/ecommerce-frontend" \
    "121754142251.dkr.ecr.eu-north-1.amazonaws.com/ecommerce-backend"
do

    docker image ls "$REPOSITORY" \
        --format '{{.Repository}}:{{.Tag}}' \
        | while read -r IMAGE
    do
        if [ -n "$IMAGE" ]; then
            docker image rm "$IMAGE" 2>/dev/null || true
        fi
    done

done

echo "[3/4] Cleaning unused build cache..."

docker builder prune -f

echo "[4/4] Removing dangling images..."

docker image prune -f

echo ""
echo "========================================"
echo "Docker cleanup completed"
echo "========================================"

echo ""
echo "Disk usage:"
df -h /

echo ""
echo "Docker disk usage:"
docker system df

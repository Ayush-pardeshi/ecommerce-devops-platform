#!/bin/sh
set -e

echo "Running database migrations..."
alembic upgrade head

echo "Seeding initial products..."
python seed.py

echo "Starting backend..."
exec uvicorn main:app --host 0.0.0.0 --port 8000

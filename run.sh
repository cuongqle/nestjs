#!/bin/bash

set -e

echo "🧹 Cleaning old containers..."
docker compose down

echo "🔨 Building and starting services..."
docker compose up --build
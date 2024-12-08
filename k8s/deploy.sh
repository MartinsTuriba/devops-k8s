#!/bin/bash

# Apply all kubernetes manifests
kubectl apply -f k8s/01-namespace.yaml
kubectl apply -f k8s/02-postgres.yaml
kubectl apply -f k8s/03-backend.yaml
kubectl apply -f k8s/04-frontend.yaml

# Wait for deployments to be ready
echo "Waiting for deployments to be ready..."
kubectl wait --namespace todo-app \
  --for=condition=ready pod \
  --selector=app=postgres \
  --timeout=90s

kubectl wait --namespace todo-app \
  --for=condition=ready pod \
  --selector=app=backend \
  --timeout=90s

kubectl wait --namespace todo-app \
  --for=condition=ready pod \
  --selector=app=frontend \
  --timeout=90s

echo "Deployment completed!" 
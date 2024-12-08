#!/bin/bash

echo "Verifying todo-app deployment..."

# Check namespace
echo "Checking namespace..."
kubectl get namespace todo-app

# Check ConfigMap
echo -e "\nChecking ConfigMap..."
kubectl get configmap -n todo-app postgres-config

# Check PVC
echo -e "\nChecking PVC..."
kubectl get pvc -n todo-app postgres-pvc

# Check all deployments
echo -e "\nChecking deployments..."
kubectl get deployments -n todo-app

# Check all services
echo -e "\nChecking services..."
kubectl get services -n todo-app

# Check all pods
echo -e "\nChecking pods..."
kubectl get pods -n todo-app

# Check pod logs
echo -e "\nChecking pod logs..."
echo "Backend logs:"
kubectl logs -n todo-app -l app=backend --tail=50
echo -e "\nFrontend logs:"
kubectl logs -n todo-app -l app=frontend --tail=50 
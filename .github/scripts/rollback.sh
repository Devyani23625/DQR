#!/bin/bash
 
set -e
 
echo "🔴 Deployment failed. Starting rollback..."
 
# Simulate restoring the previous deployment artifact
if [ -d "./successful_version" ]; then
  echo "♻️ Restoring previous version from rollback_backup..."
  rm -rf deployed_version
  cp -r successful_version deployed_version
  
  mkdir -p deployed_version
  echo "App version deployed at $(date)" > deployed_version/app.txt
 
  # Create a log file for this deployment
  mkdir -p logs
  echo "{\"status\": \"rollback success\", \"timestamp\": \"$(date)\"}" > logs/deployment_log.json
 
  echo "✅ Rollback complete. Previous version restored."
else
  echo "❌ No previous artifact found for rollback!"
  exit 1
fi

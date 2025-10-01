deploy.sh : 
#!/bin/bash
 
set -e  # Exit immediately if any command fails
 
echo "🟢 Starting deployment..."
 
# Simulate build/deployment process (replace with actual logic)
mkdir -p deployed_version
echo "App version deployed at $(date)" > deployed_version/app.txt
 
# Create a log file for this deployment
mkdir -p logs
echo "{\"status\": \"deployment_success\", \"timestamp\": \"$(date)\"}" > logs/deployment_log.json
 
echo "✅ Deployment completed successfully."

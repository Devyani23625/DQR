const fs = require('fs');
const path = require('path');

const logsPath = path.join(__dirname, 'deployment_logs.json');

if (!fs.existsSync(logsPath)) {
  console.error('deployment_logs.json file not found!');
  process.exit(1);
}

const logs = JSON.parse(fs.readFileSync(logsPath, 'utf-8'));

// Compute DQR:
// DQR = (count of successful deployments without rollback) / (total deployments) * 100

const totalDeployments = logs.length;
const successfulWithoutRollback = logs.filter(log => log.status === 'success' && log.rollback === 'false').length;

const dqr = totalDeployments === 0 ? 0 : (successfulWithoutRollback / totalDeployments) * 100;

console.log(`Deployment Quality Rate: ${dqr.toFixed(2)}%`);

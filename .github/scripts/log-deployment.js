const fs = require('fs');
const args = {};
process.argv.slice(2).forEach((arg, i, arr) => {
  if (arg.startsWith('--')) {
    const key = arg.slice(2);
    const value = arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true;
    args[key] = value;
  }
});


const log = {
  deployment_id: process.env.GITHUB_RUN_ID,
  repo: process.env.GITHUB_REPOSITORY,
  status: args.status || 'failed',
  rollback: args.rollback === 'true',
  reverted_to: args.reverted_to || null,
  version: args.version || null,
  timestamp: new Date().toISOString()
};

fs.writeFileSync('deployment_logs.json', JSON.stringify([log], null, 2));

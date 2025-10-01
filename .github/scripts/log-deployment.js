// .github/scripts/log-deployment.js

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  return index !== -1 ? args[index + 1] : null;
};

const logFilePath = path.join(process.cwd(), ".github/deployment_logs.json");

const log = {
  deployment_id: `${Date.now()}`,
  repo: process.env.GITHUB_REPOSITORY,
  status: getArg("--status") || "unknown",
  rollback: getArg("--rollback") === "true",
  reverted_to: getArg("--reverted_to") || null,
  version: getArg("--version") || "n/a",
  timestamp: new Date().toISOString(),
};

fs.appendFileSync(logFilePath, JSON.stringify(log) + "\n");
console.log("Logged:", log);

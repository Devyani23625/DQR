const fs = require("fs");
const path = require("path");

// Load deployment log (last run)
const logPath = path.join(__dirname, "deployment_logs.json");

// Or load history for all runs:
// const logPath = path.join(__dirname, "../data/deployments.json");

const data = JSON.parse(fs.readFileSync(logPath, "utf8"));

// Basic DQR example:
// Success rate = (successful deployments / total deployments) * 100
const total = data.length;
const successCount = data.filter(d => d.status === "success").length;
const failCount = total - successCount;
const rollbackCount = data.filter(d => d.rollback === true).length;

console.log("📊 Deployment Quality Report:");
console.log(`Total Deployments: ${total}`);
console.log(`✅ Successful: ${successCount}`);
console.log(`❌ Failed: ${failCount}`);
console.log(`↩️ Rollbacks: ${rollbackCount}`);
console.log(`📈 DQR (Success %): ${(successCount / total * 100).toFixed(2)}%`);

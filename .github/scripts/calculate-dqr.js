// .github/scripts/calculate-dqr.js
const fs = require("fs");

const logFile = ".github/deployment-logs.json";

const lines = fs.readFileSync(logFile, "utf-8").trim().split("\n");

let total = 0;
let goodDeployments = 0;

lines.forEach((line) => {
  try {
    const log = JSON.parse(line);
    total++;
    if (log.status === "success" && log.rollback === false) {
      goodDeployments++;
    }
  } catch (e) {
    console.error("Bad log line:", line);
  }
});

const dqr = total === 0 ? 0 : (goodDeployments / total) * 100;
console.log(`✅ Deployment Quality Rate: ${dqr.toFixed(2)}% (${goodDeployments}/${total})`);

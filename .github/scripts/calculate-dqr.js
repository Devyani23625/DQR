const fs = require("fs");
const path = ".github/data/deployments.json";

function calculateDQR(logs) {
  const total = logs.length;
  const cleanDeploys = logs.filter(entry => entry.status === "success" && entry.rollback === false).length;
  const rate = total === 0 ? 0 : (cleanDeploys / total) * 100;
  return { total, cleanDeploys, dqr: rate.toFixed(2) };
}

function main() {
  if (!fs.existsSync(path)) {
    console.error("Deployment log not found.");
    process.exit(1);
  }

  const logs = JSON.parse(fs.readFileSync(path));
  const result = calculateDQR(logs);

  console.log(`📊 DQR Report:`);
  console.log(`➡️ Total Deployments: ${result.total}`);
  console.log(`✅ Successful without Rollback: ${result.cleanDeploys}`);
  console.log(`📈 Deployment Quality Rate: ${result.dqr}%`);

  fs.writeFileSync(".github/data/dqr.json", JSON.stringify(result, null, 2));
}

main();

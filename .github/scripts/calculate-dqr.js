const fs = require('fs');
const path = require('path');

const logPath = path.join('.github', 'data', 'deployments.json');
const outputPath = 'DQR.md';

function calculateDQR(logs) {
  const total = logs.length;
  const good = logs.filter(d => d.status === "success" && d.rollback === false).length;

  const rate = total === 0 ? 0 : ((good / total) * 100).toFixed(2);
  return { total, good, rate };
}

const logs = JSON.parse(fs.readFileSync(logPath));
const { total, good, rate } = calculateDQR(logs);

const markdown = `
# 📊 Deployment Quality Rate (DQR)

- **Total Deployments:** ${total}
- ✅ **Successful (no rollback):** ${good}
- ❌ **Rollbacks:** ${total - good}

> **Deployment Quality Rate:** \`${rate}%\`

_Last updated: ${new Date().toISOString()}_
`;

fs.writeFileSync(outputPath, markdown);
console.log("✅ DQR calculated and written to DQR.md");

const fs = require("fs");
const path = require("path");

function saveToJsonFile(data) {
  const dirPath = path.join(__dirname, "../data_collected");

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const fileName = `telemetry_${Date.now()}.json`;
  const filePath = path.join(dirPath, fileName);

  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2),
    "utf-8"
  );

  return filePath;
}

module.exports = saveToJsonFile;

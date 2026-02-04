const collectTelemetry = require("./services/telemetryService");
const saveToJsonFile = require("./utils/fileWriter");

async function main() {
  const serialNumbers = Array.from({ length: 500 }, (_, i) =>
    `SN-${String(i).padStart(3, "0")}`
  );

  console.log("Starting telemetry collection...");

  const results = await collectTelemetry(serialNumbers);

  console.log(`Collected data for ${results.length} devices`);

  const filePath = saveToJsonFile(results);

  console.log(`Telemetry saved to: ${filePath}`);
}

main().catch(err => {
  console.error("Fatal error:", err.message);
});

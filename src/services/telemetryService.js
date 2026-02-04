const createBatches = require("../core/batcher");
const fetchBatch = require("../api/energyGridClient");
const RateLimiter = require("../core/rateLimiter");
const { RATE_LIMIT_MS, MAX_BATCH_SIZE } = require("../config/env");

const rateLimiter = new RateLimiter(RATE_LIMIT_MS);

async function collectTelemetry(serialNumbers) {
  const batches = createBatches(serialNumbers, MAX_BATCH_SIZE);
  const aggregatedResults = [];

  for (const batch of batches) {
    const response = await rateLimiter.enqueue(() =>
      fetchBatch(batch)
    );

    aggregatedResults.push(...response.data);
  }

  return aggregatedResults;
}

module.exports = collectTelemetry;

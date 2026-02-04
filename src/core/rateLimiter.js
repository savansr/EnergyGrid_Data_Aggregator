const sleep = require("../utils/sleep");

class RateLimiter {
  constructor(intervalMs) {
    this.intervalMs = intervalMs;
    this.queue = [];
    this.running = false;
  }

  enqueue(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.run();
    });
  }

  async run() {
    if (this.running) return;
    this.running = true;

    while (this.queue.length > 0) {
      const { task, resolve, reject } = this.queue.shift();

      try {
        const result = await task();
        resolve(result);
      } catch (err) {
        reject(err);
      }

      await sleep(this.intervalMs);
    }

    this.running = false;
  }
}

module.exports = RateLimiter;

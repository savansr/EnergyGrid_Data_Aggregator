# EnergyGrid Data Aggregator

## Instructions to Run the Solution

1. **Prerequisites**
   - Node.js v14 or higher
   - npm
   - Ensure the EnergyGrid Mock API is running on `http://localhost:3000`

2. **Install dependencies**
   ```bash
   npm install
3. **Start the Application**
   ``` bash
   npm start

## Approach Explanation (Rate Limiting & Concurrency)

- The API enforces a strict limit of **1 request per second** and allows a maximum of **10 devices per request**.
- The total set of **500 devices** is divided into **50 batches**, each containing **10 devices**.
- All API requests are submitted to a **queue-based rate limiter** rather than being executed directly.
- The rate limiter guarantees that:
  - Requests are executed **sequentially**
  - **Exactly one request per second** is sent
  - No parallel API calls occur, preventing **HTTP 429 (Too Many Requests)** errors
- Retries for **429 responses or network failures** are handled safely and re-queued without violating the rate limit.

This design achieves the **maximum possible throughput** while strictly adhering to all API constraints.


## Assumptions :

- The rate limit of 1 request per second is a hard constraint

- The API requires the signature format MD5(URL + Token + Timestamp)

- The API endpoint accepts only the URL path (not the full URL) when generating the signature





const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

class Retry {
  cb: (data: any) => void;
  errors: any[];
  iteration: number;
  constructor(cb: (data: any) => void) {
    this.cb = cb;
    this.errors = [];
    this.iteration = 0;
  }

  async times(times: number, intervalMs: number) {
    return this.timeout(times * intervalMs, intervalMs);
  }

  async timeout(timeout: number, intervalMs: number) {
    let currentTs = 0;
    while (currentTs < timeout) {
      try {
        const result = await this.cb((this.iteration += 1));
        return result;
      } catch (e) {
        this.errors.push(e);
      }
      await sleep(intervalMs);
      currentTs += intervalMs;
    }
    throw this.errors;
  }
}

const retry = (cb: (data: any) => void) => new Retry(cb);

export default retry;

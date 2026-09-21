import { defineConfig } from '@playwright/test';

const PORT = 8899;

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 45_000,   // headroom for slow/loaded machines
  expect: { timeout: 5_000 },
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    channel: 'chrome',                         // use the system Chrome — no browser download
    launchOptions: { args: ['--no-sandbox'] }, // required when running as root
  },
  webServer: {
    command: `node tests/static-server.mjs ${PORT}`,
    url: `http://127.0.0.1:${PORT}/index.html`,
    reuseExistingServer: true,
    timeout: 20_000,
  },
});

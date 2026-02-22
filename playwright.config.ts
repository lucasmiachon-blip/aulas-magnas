import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: true,
  },
  projects: [
    {
      name: 'plan-a',
      use: { viewport: { width: 1920, height: 1080 } },
    },
    {
      name: 'plan-b',
      use: { viewport: { width: 1280, height: 720 } },
    },
    {
      name: 'plan-c',
      use: { viewport: { width: 1280, height: 720 } },
    },
  ],
});

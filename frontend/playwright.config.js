import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    navigationTimeout: 10000, // ให้รอมัน 10 วินาทีมึง!
  },
});
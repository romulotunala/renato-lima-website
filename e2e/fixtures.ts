import { test as base } from '@playwright/test';

export { expect } from '@playwright/test';

// O build de produção inclui o GA; os testes não podem enviar dados para ele
export const test = base.extend({
  page: async ({ page }, provide) => {
    await page.route(/googletagmanager\.com|google-analytics\.com/, (route) => route.abort());
    await provide(page);
  },
});

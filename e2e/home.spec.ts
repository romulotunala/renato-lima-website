import { test, expect } from '@playwright/test';

test.describe('Home page smoke tests', () => {
  test('loads the home page successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Renato Lima/i);
  });

  test('displays the hero section with a heading', async ({ page }) => {
    await page.goto('/');
    const hero = page.getByRole('region', { name: 'Apresentação principal' });
    await expect(hero).toBeVisible();
    await expect(hero.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('displays the services section', async ({ page }) => {
    await page.goto('/');
    const services = page.getByRole('region', { name: 'Dores e problemas comuns' });
    await expect(services).toBeVisible();
  });
});

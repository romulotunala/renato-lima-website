import { test, expect, type Locator } from '@playwright/test';

// As opções ficam desabilitadas por um instante após trocar de tela; o Playwright espera
// cada uma ficar habilitada antes de clicar.
async function choose(section: Locator, ...labels: string[]) {
  for (const label of labels) {
    await section.getByRole('radio', { name: label, exact: true }).click();
  }
}

test.describe('Pre-diagnosis section', () => {
  test('scrolls to the section from the menu', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Menu principal' })
      .getByRole('link', { name: 'Pré-Diagnóstico', exact: true })
      .click();

    await expect(page.getByRole('region', { name: 'Pré-diagnóstico' })).toBeInViewport();
  });

  test('completes the duo flow and builds the WhatsApp link', async ({ page }) => {
    await page.goto('/');
    const section = page.getByRole('region', { name: 'Pré-diagnóstico' });
    const continueButton = section.getByRole('button', { name: 'Continuar' });

    await choose(section, 'Hipertrofia', 'Personal em Dupla', 'Sim');
    await section.getByLabel('Em qual bairro ou região pretende treinar?').fill('Recreio');
    await choose(section, 'Noite');
    await continueButton.click();
    await choose(section, 'Às vezes', 'Não', 'Falta de constância');
    await expect(section.getByText('Etapa 8 de 9')).toBeVisible();
    await choose(section, 'O quanto antes');

    await expect(section.getByText('Etapa 9 de 9')).toBeVisible();
    await section.getByLabel('Qual é seu primeiro nome?').fill('Ana');
    await continueButton.click();
    await expect(section.getByText(/^Ana, pelo que você respondeu/)).toBeVisible();

    const link = section.getByRole('link', { name: 'Verificar disponibilidade no WhatsApp' });
    const href = await link.getAttribute('href');
    const message = new URL(href ?? '').searchParams.get('text');

    expect(message).toContain('*Interesse indicado*: Personal em Dupla');
    expect(message).toContain('*Região*: Recreio');
    expect(message).toContain('*Já tenho alguém para treinar comigo*: Sim');
  });
});

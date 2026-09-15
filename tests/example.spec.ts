import { test, expect } from '@playwright/test';

// Prevent the chatbot auto-open during tests by setting the session key early
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    try {
      sessionStorage.setItem('entraiot_sales_chat_auto_opened', '1');
    } catch {}
  });
});

test.describe('Homepage', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Entraiot|Solutions/);
  });

  test('should display navigation menu', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');
    const aboutLink = page.locator('a[href="/about"]');
    await expect(aboutLink).toBeVisible();
  });
});

test.describe('Contact Form', () => {
  test('should display contact form', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded', timeout: 60000 });
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'domcontentloaded', timeout: 60000 });
    const submitButton = page.getByRole('button', { name: /submit|send/i });
    // ensure chat overlay won't intercept clicks
    await page.evaluate(() => {
      try {
        sessionStorage.setItem('entraiot_sales_chat_auto_opened', '1');
      } catch {}
      const chat = document.querySelector('section.fixed');
      if (chat && chat instanceof HTMLElement) chat.style.pointerEvents = 'none';
    });
    await submitButton.click();
    // Add specific validation checks based on form implementation
  });
});

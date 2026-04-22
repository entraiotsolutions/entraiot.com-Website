# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> Homepage >> should display navigation menu
- Location: tests\example.spec.ts:18:7

# Error details

```
Error: page.goto: NS_ERROR_CONNECTION_REFUSED
Call log:
  - navigating to "http://localhost:3002/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // Prevent the chatbot auto-open during tests by setting the session key early
  4  | test.beforeEach(async ({ page }) => {
  5  |   await page.addInitScript(() => {
  6  |     try {
  7  |       sessionStorage.setItem('entraiot_sales_chat_auto_opened', '1');
  8  |     } catch {}
  9  |   });
  10 | });
  11 | 
  12 | test.describe('Homepage', () => {
  13 |   test('should load the homepage', async ({ page }) => {
  14 |     await page.goto('/');
  15 |     await expect(page).toHaveTitle(/Entraiot|Solutions/);
  16 |   });
  17 | 
  18 |   test('should display navigation menu', async ({ page }) => {
> 19 |     await page.goto('/');
     |                ^ Error: page.goto: NS_ERROR_CONNECTION_REFUSED
  20 |     const header = page.locator('header');
  21 |     await expect(header).toBeVisible();
  22 |   });
  23 | 
  24 |   test('should have working navigation links', async ({ page }) => {
  25 |     await page.goto('/');
  26 |     const aboutLink = page.locator('a[href="/about"]');
  27 |     await expect(aboutLink).toBeVisible();
  28 |   });
  29 | });
  30 | 
  31 | test.describe('Contact Form', () => {
  32 |   test('should display contact form', async ({ page }) => {
  33 |     await page.goto('/contact', { waitUntil: 'domcontentloaded', timeout: 60000 });
  34 |     const form = page.locator('form');
  35 |     await expect(form).toBeVisible();
  36 |   });
  37 | 
  38 |   test('should validate required fields', async ({ page }) => {
  39 |     await page.goto('/contact', { waitUntil: 'domcontentloaded', timeout: 60000 });
  40 |     const submitButton = page.getByRole('button', { name: /submit|send/i });
  41 |     // ensure chat overlay won't intercept clicks
  42 |     await page.evaluate(() => {
  43 |       try {
  44 |         sessionStorage.setItem('entraiot_sales_chat_auto_opened', '1');
  45 |       } catch {}
  46 |       const chat = document.querySelector('section.fixed');
  47 |       if (chat && chat instanceof HTMLElement) chat.style.pointerEvents = 'none';
  48 |     });
  49 |     await submitButton.click();
  50 |     // Add specific validation checks based on form implementation
  51 |   });
  52 | });
  53 | 
```
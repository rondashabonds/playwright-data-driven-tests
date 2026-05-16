import { test, expect } from '@playwright/test';

const testCases = [
  {
    app: 'Web Application',
    task: 'Implement user authentication',
    column: 'To Do',
    tags: ['Feature', 'High Priority'],
  },
  {
    app: 'Web Application',
    task: 'Fix navigation bug',
    column: 'To Do',
    tags: ['Bug'],
  },
  {
    app: 'Web Application',
    task: 'Design system updates',
    column: 'In Progress',
    tags: ['Design'],
  },
  {
    app: 'Mobile Application',
    task: 'Push notification system',
    column: 'To Do',
    tags: ['Feature'],
  },
  {
    app: 'Mobile Application',
    task: 'Offline mode',
    column: 'In Progress',
    tags: ['Feature', 'High Priority'],
  },
  {
    app: 'Mobile Application',
    task: 'App icon design',
    column: 'Done',
    tags: ['Design'],
  },
];

test.describe('Data-driven tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');

    await page.locator('input[type="text"]').fill('admin');
    await page.locator('input[type="password"]').fill('password123');
    await page.locator('button').click();

    await expect(
      page.getByRole('button', { name: /Web Application/i })
    ).toBeVisible();
  });

  for (const data of testCases) {
    test(`Verify ${data.task}`, async ({ page }) => {
      await page.getByRole('button', {
        name: new RegExp(data.app, 'i'),
      }).click();

      const column = page.locator('div').filter({
        hasText: data.column,
      }).first();

      await expect(column).toBeVisible();

      const card = column.locator('div').filter({
        hasText: data.task,
      }).first();

      await expect(card).toBeVisible();
      await expect(card).toContainText(data.task);

      for (const tag of data.tags) {
        await expect(card).toContainText(tag);
      }
    });
  }
});
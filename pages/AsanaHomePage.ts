import { Page, expect } from '@playwright/test';

export class AsanaHomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToHomePage() {
    await this.page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
  }

  async completeLoginProcess() {
    await this.page.locator('input[type="text"]').fill('admin');
    await this.page.locator('input[type="password"]').fill('password123');
    await this.page.locator('button').click();

    await expect(
      this.page.getByRole('button', { name: /Web Application/i })
    ).toBeVisible();
  }

  async selectApplication(appName: string) {
  await this.page
    .getByRole('button')
    .filter({ hasText: appName })
    .first()
    .click();
}

  async verifyTaskInColumn(columnName: string, taskName: string) {
    const column = this.page
      .locator('div')
      .filter({ hasText: columnName })
      .first();

    await expect(column).toContainText(taskName);
  }

  async verifyTaskTags(taskName: string, tags: string[]) {
    const taskCard = this.page
      .locator('div')
      .filter({ hasText: taskName })
      .first();

    await expect(taskCard).toBeVisible();

    for (const tag of tags) {
      await expect(taskCard).toContainText(tag);
    }
  }
}
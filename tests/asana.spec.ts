import { test } from '@playwright/test';
import { AsanaHomePage } from '../pages/AsanaHomePage';
import { testCases } from '../data/testCases';

test.describe('Asana task board validation', () => {
  for (const data of testCases) {
    test(`Verify "${data.task}" appears in ${data.column} with correct tags`, async ({ page }) => {
      const homePage = new AsanaHomePage(page);

      await homePage.navigateToHomePage();
      await homePage.completeLoginProcess();
      await homePage.selectApplication(data.app);
      await homePage.verifyTaskInColumn(data.column, data.task);
      await homePage.verifyTaskTags(data.task, data.tags);
    });
  }
});
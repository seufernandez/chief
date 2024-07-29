import test, { expect } from "@playwright/test";

test('Checking the existence and interactions of Homepage elements', async ({ page }) => {
  await page.goto('/');

  const heading = page.locator('role=heading[name="Task Manager App"]');
  await expect(heading).toBeVisible();
  await heading.click();

  const refreshButton = page.locator('role=button[name="Refresh"]');
  await expect(refreshButton).toBeVisible();
  await refreshButton.click();

  const createUserButton = page.locator('role=button[name="Create User"]');
  await expect(createUserButton).toBeVisible();
  await createUserButton.click();
  
  await createUserButton.click();
  const emailError = page.locator('text="A valid Email is required"');
  const lastNameError = page.locator('text="Last name is required"');
  const firstNameError = page.locator('text="First name is required"');
  const RoleError = page.locator('text="Role is required"');

  await expect(emailError).toBeVisible();
  await expect(lastNameError).toBeVisible();
  await expect(firstNameError).toBeVisible();
  await expect(RoleError).toBeVisible();
  
});

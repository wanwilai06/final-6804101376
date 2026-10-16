import { test, expect } from '@playwright/test';

test.describe('UT-01: Login Form Validation', () => {
  test('UT-01.1: empty username and password', {
    annotation: { type: 'description', description: 'ตรวจสอบการ Login เมื่อไม่กรอก Username และ Password' }
  }, async ({ page }) => {
    await test.step('เปิดหน้า Login', async () => {
      await page.goto('https://www.saucedemo.com/');
    });
    await test.step('คลิกปุ่มไม่กรอกข้อมูล', async () => {
      await page.click('#login-button');
    });
    await test.step('การตรบสอบ Error และ URL', async () => {
      await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
      await expect(page).not.toHaveURL(/.*inventory\.html/);
    });
  });

  test('UT-01.2: missing password', {
    annotation: { type: 'description', description: 'ตรวจสอบการ Login เมื่อกรอก Username แต่ไม่กรอก Password' }
  }, async ({ page }) => {
    await test.step('เปิดหน้า Login และกรอก Username', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.fill('#user-name', 'standard_user');
    });
    await test.step('กด Login โดยไม่กรอก Password', async () => {
      await page.click('#login-button');
    });
    await test.step('การตรบสอบ Error และ URL', async () => {
      await expect(page.locator('[data-test="error"]')).toContainText('Password is required');
      await expect(page).not.toHaveURL(/.*inventory\.html/);
    });
  });

  test('UT-01.3: invalid login details', {
    annotation: { type: 'description', description: 'ตรวจสอบการ Login เมื่อ Username และ Password ไม่ถูกต้อง' }
  }, async ({ page }) => {
    await test.step('เปิดหน้า Login และกรอกข้อมูลผิด', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.fill('#user-name', 'invalid_user');
      await page.fill('#password', 'wrong_password');
    });
    await test.step('กด Login', async () => {
      await page.click('#login-button');
    });
    await test.step('การตรบสอบ Error และ URL', async () => {
      await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
      await expect(page).not.toHaveURL(/.*inventory\.html/);
    });
  });
});
import { test, expect } from '@playwright/test';

test('ST-02: checkout validation and recovery', {
  annotation: {
    type: 'description',
    description: 'ตรวจสอบ Checkout Validation และการแก้ไขข้อมูลจนสั่งซื้อสำเร็จ'
  }
}, async ({ page }) => {

  await test.step('Login เพิ่มสินค้า และเปิด Checkout', async () => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // เพิ่มสินค้า Backpack ลงตะกร้า
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);
  });

  await test.step('ตรวจสอบ First Name is required', async () => {
    // ส่งฟอร์มว่างๆ และเช็ค Error
    await page.click('[data-test="continue"]');
    await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
  });

  await test.step('ตรวจสอบ Last Name is required', async () => {
    // กรอก First Name แต่เว้น Last Name ไว้
    await page.fill('[data-test="firstName"]', 'John');
    await page.click('[data-test="continue"]');
    await expect(page.locator('[data-test="error"]')).toContainText('Error: Last Name is required');
  });

  await test.step('ตรวจสอบ Postal Code is required', async () => {
    // กรอก Last Name เพิ่ม แต่เว้น Postal Code ไว้
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.click('[data-test="continue"]');
    await expect(page.locator('[data-test="error"]')).toContainText('Error: Postal Code is required');
  });

  await test.step('แก้ไขข้อมูลและสั่งซื้อสำเร็จ', async () => {
    // กรอก Postal Code ให้ครบถ้วนแล้วกด Continue
    await page.fill('[data-test="postalCode"]', '50200');
    await page.click('[data-test="continue"]');
    
    // ตรวจสอบว่าเข้าสู่หน้า Overview สำเร็จ
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    
    // คลิก Finish เพื่อสั่งซื้อ
    await page.click('[data-test="finish"]');
    
    // ตรวจสอบข้อความสั่งซื้อสำเร็จ
    await expect(page).toHaveURL(/.*checkout-complete\.html/);
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

});
import { test, expect } from '@playwright/test';

// 1. สร้างฟังก์ชัน Driver สำหรับจำลองสถานะ Login ด้วย Cookie
async function driverOpenInventory(context: any, page: any) {
  await context.addCookies([
    {
      name: 'session-username',
      value: 'standard_user',
      domain: 'www.saucedemo.com',
      path: '/'
    }
  ]);
  await page.goto('https://www.saucedemo.com/inventory.html');
}

test('IT-02: DRIVER login state -> REAL Inventory and Cart', {
  annotation: {
    type: 'description',
    description: 'ใช้ Driver เตรียมสถานะ Login เพื่อทดสอบ Inventory และ Cart จริง'
  }
}, async ({ browser }) => {
  // สร้าง context และ page แยกสำหรับ Driver pattern
  const context = await browser.newContext();
  const page = await context.newPage();

  await test.step('สร้าง Driver และเปิด Inventory', async () => {
    await driverOpenInventory(context, page);
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  await test.step('ตรวจสอบ Inventory จริง', async () => {
    // ตรวจสอบว่าแสดงสินค้าครบ 6 รายการ
    const inventoryItems = page.locator('.inventory_item');
    await expect(inventoryItems).toHaveCount(6);
  });

  await test.step('เพิ่มสินค้า 2 รายการ', async () => {
    // เพิ่ม Backpack และ Bike Light แล้วตรวจสอบ Cart Badge = 2
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

  await test.step('ตรวจสอบสินค้าใน Cart', async () => {
    // เปิด Cart และตรวจสอบชื่อสินค้าทั้งสองรายการ
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/.*cart\.html/);
    
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);
    await expect(page.locator('.inventory_item_name').nth(0)).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_item_name').nth(1)).toHaveText('Sauce Labs Bike Light');
  });

  // ปิด BrowserContext ที่สร้างเมื่อสิ้นสุดการทดสอบ
  await context.close();
});
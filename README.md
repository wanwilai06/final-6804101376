# Integration Testing - IT-01 (Top-Down with Stub)

- **Real Component:** ส่วนของการ Login เข้าสู่ระบบจริงผ่านเว็บไซต์จริง `https://www.saucedemo.com/` (ใช้ Username และ Password จริง)
- **Stub Component:** ส่วนของหน้า Inventory หลังจาก Login สำเร็จ โดยใช้ฟังก์ชัน `page.setContent()` ของ Playwright เพื่อจำลอง DOM (Stub) ของรายการสินค้า (`Mock Backpack` และ `Mock Bike Light`) แทนการดึงข้อมูลจากหน้าเว็บจริง

---

# Integration Testing - IT-02 (Bottom-Up with Driver)

- **Driver Component:** ฟังก์ชัน `driverOpenInventory()` ที่ทำหน้าที่จำลองการเตรียมสถานะ (Driver Setup) ด้วยการเพิ่ม Cookie `session-username` เข้าไปใน BrowserContext เพื่อข้ามหน้า Login Form ไปยังหน้า Inventory โดยตรง
- **Real Component:** ส่วนของการทำงานจริงบนหน้า Inventory และ Shopping Cart (`cart.html`) ทั้งการแสดงรายการสินค้าจริง 6 ชิ้น, การกดปุ่มเพิ่มสินค้าลงตะกร้า, การอัปเดต Cart Badge และการตรวจสอบข้อมูลในตะกร้าสินค้าจริง
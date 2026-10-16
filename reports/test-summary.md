# Test Execution Summary Report

**รหัสนักศึกษา:** 6804101376  
**ชื่อ-นามสกุล:** วรรณวิลัย เรืองนาค  
**วิชา:** Software Testing (Final Examination)  
**ระบบที่ทดสอบ:** https://www.saucedemo.com/  

---

## สรุปผลการทดสอบ (Test Results)

| ข้อที่ | ชุดทดสอบ (Test Suite) | สถานะ (Status) | หมายเหตุ |
| :--- | :--- | :---: | :--- |
| **UT-01** | Login Form Validation (3 Test Cases) | **PASSED** | ตรวจสอบกรณีไม่กรอกข้อมูล, ขาด Password และข้อมูลผิด |
| **UT-02** | Product Button State Validation | **PASSED** | ตรวจสอบปุ่ม Add to cart, Remove และ Cart Badge |
| **IT-01** | Top-Down Integration Testing (Stub) | **PASSED** | ใช้ `page.setContent()` จำลองหน้า Inventory |
| **IT-02** | Bottom-Up Integration Testing (Driver) | **PASSED** | ใช้ Cookie `session-username` เพื่อบายพาส Login |
| **ST-01** | Complete Purchase Flow (2 Products) | **PASSED** | ทดสอบกระบวนการสั่งซื้อสำเร็จ |
| **ST-02** | Checkout Validation and Recovery | **PASSED** | ตรวจสอบ Validation ฟอร์มและสั่งซื้อสำเร็จ |

**ผลสรุปภาพรวม:** การทดสอบทั้งหมดผ่านการรันสำเร็จเรียบร้อยแล้ว (Passed 100%)
const { test, expect } = require('@playwright/test');

test.describe('Condo UI', () => {

  test('add condo success', async ({ page }) => {
    
    // 🎲 สุ่มเลขห้องและชื่อ เพื่อป้องกันข้อมูลซ้ำ
    const randomNumber = Math.floor(Math.random() * 10000);
    const uniqueRoom = `PW-${randomNumber}`;
    const condoTitle = `Playwright Condo ${randomNumber}`;

    // 💬 ดักฟังเหตุการณ์ Alert ล่วงหน้า
    page.on('dialog', async dialog => {
      console.log(`💬 เจอ Alert ข้อความ: ${dialog.message()}`);
      await dialog.accept();
    });

    // 🏎️ สเต็ปที่ 1: สั่งกางหน้าจอให้ใหญ่ยักษ์ตั้งแต่แรกสุด
    await page.setViewportSize({ width: 1920, height: 1080 });

    // 🌐 สเต็ปที่ 2: สั่งยิงตรงไปที่พอร์ต Nginx หน้าบ้าน
    await page.goto('http://localhost:8080/');

    // 2. ตรวจสอบเช็คความพร้อมหน้าเว็บ
    await expect(page.locator('h1')).toContainText('Condo Management System');

    // 3. 🤖 บ็อทเริ่มทำการกรอกข้อมูลลงฟอร์มออโต้
    await page.locator('input[name="title"]').fill(condoTitle);
    await page.locator('input[name="roomNumber"]').fill(uniqueRoom);
    await page.locator('textarea[name="description"]').fill('ทดสอบระบบด้วยบ็อทออโตเมชันเวอร์ชันแก้บั๊กพาธ');
    await page.locator('input[name="price"]').fill('18000');
    await page.locator('input[name="location"]').fill('BTS อารีย์');
    await page.locator('input[name="size"]').fill('35');
    
    await page.locator('select[name="bedrooms"]').selectOption('1');
    await page.locator('select[name="bathrooms"]').selectOption('1');

    // 4. คลิกปุ่มบันทึกข้อมูลคอนโดแบบดิบ ๆ
    await page.locator('button.submit-btn').click();

    // 5. 🧐 ตรวจสอบผลลัพธ์ (Assertion): รอให้การ์ดที่มีเลขห้องสุ่มตัวนี้โผล่มาโชว์จริง
    const newCondoCard = page.locator('.condo-card', { hasText: uniqueRoom });
    
    // สั่งให้บ็อทรอนิ่ง ๆ สูงสุด 5 วินาที เพื่อรอให้การ์ดอัปเดตขึ้นหน้าจอ
    await newCondoCard.waitFor({ state: 'visible', timeout: 5000 });
    
    // ตรวจสอบความชัวร์ซ้ำอีกครั้งว่ามองเห็นได้จริงบนเบราว์เซอร์
    await expect(newCondoCard).toBeVisible();
    
    console.log(`🎉 [SUCCESS] บ็อทรันเทสเลขห้อง ${uniqueRoom} ผ่านฉลุย!`);
  }); // ปิดตัว test

}); // ปิดตัว describe
// เปลี่ยนจาก require เป็น import มึง!
import { test, expect } from '@playwright/test';

test('เช็คว่าเว็บกูเปิดติดไหม', async ({ page }) => {
  // มึงอย่าลืมเช็ค Port 5173 ให้ตรงกับที่ Vite มึงรันนะมึง
  await page.goto('http://localhost:5173'); 
  await expect(page).toHaveTitle(/.*.*/);
});
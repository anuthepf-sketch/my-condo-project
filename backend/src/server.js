const app = require('./app'); // 👈 1. ดึงโค้ดเซิร์ฟเวอร์หลักมาจากไฟล์ app.js
const PORT = process.env.PORT || 5000; // 👈 2. ดึงเลขพอร์ตจาก .env (ถ้าไม่มีให้ใช้ 5000)

// START SERVER
app.listen(PORT, () => {
    console.log(`📡 Server is running on port: ${PORT}`);
});
# 1. ดึงแผ่นฐาน Node.js มาใช้ในการประกอบร่าง (Build) โค้ดก่อน
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# สั่ง Build แตกไฟล์เว็บให้ออกมาเป็นโฟลเดอร์ dist หรือ build (ไฟล์ HTML/JS/CSS คลีนๆ)
RUN npm run build

# 2. ย้ายค่ายมาใช้แผ่นฐาน Nginx (เว็บเซิร์ฟเวอร์ขนาดจิ๋ว) เพื่อเสิร์ฟหน้าเว็บให้เบราว์เซอร์อ่าน
FROM nginx:alpine

# ก๊อปปี้ไฟล์เว็บที่ Build เสร็จจากขั้นตอนแรก ย้ายมาใส่ในโฟลเดอร์แสดงผลของ Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# เปิด Port 80 ซึ่งเป็น Port มาตรฐานของหน้าเว็บทั่วไป
EXPOSE 80

# สั่งให้ Nginx ทำงานแบบรันค้างไว้ไม่ให้ดับ
CMD ["nginx", "-g", "daemon off;"]
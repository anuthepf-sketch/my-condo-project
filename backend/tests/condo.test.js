const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app'); 

describe('Condo API Automation Testing', () => {
  
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/condo';
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoUri);
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test Case 1: ตรวจสอบหน้าแรกของระบบหลังบ้าน ต้องตอบกลับสำเร็จ
  it('GET / - Should return status 200 and welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

  // Test Case 2: ตรวจสอบเส้นทางระบบจองห้องพัก
  it('GET /api/booking - Should connect to booking router successfully', async () => {
    const res = await request(app).get('/api/booking');
    expect(res.statusCode).toBe(200);
  });

});
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // 👈 ตัวนี้แหละที่ทำหน้าที่คุยกับ Mongo

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// 🔌 🚨 ท่อเชื่อมต่อฐานข้อมูลตัวจริงเสียงจริง (แฝงตัวอยู่ใน app.js)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/condo_db';
mongoose.connect(MONGO_URI)
  .then(() => console.log('🟢 [Docker Backend] Connected to MongoDB successfullyโว้ยมึง!'))
  .catch(err => console.error('❌ Database connection error:', err));

// 🗄️ โมเดลฐานข้อมูลจำลอง (Schema)
const CondoSchema = new mongoose.Schema({
  title: String,
  roomNumber: String,
  description: String,
  price: Number,
  location: String,
  size: Number,
  bedrooms: Number,
  bathrooms: Number,
  status: { type: String, default: 'ว่าง' }
});

const Condo = mongoose.model('Condo', CondoSchema);

// 📡 [GET] เส้นทางดึงข้อมูลคอนโดทั้งหมด
app.get('/api/condos', async (req, res) => {
  try {
    const condos = await Condo.find();
    res.json(condos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🚀 [POST] เส้นทางรับบันทึกข้อมูลคอนโดใหม่
app.post('/api/condos', async (req, res) => {
  try {
    const existingCondo = await Condo.findOne({ roomNumber: req.body.roomNumber });
    if (existingCondo) {
      return res.status(400).json({ message: 'เลขห้องนี้มีอยู่แล้วในระบบ' });
    }

    const newCondo = new Condo(req.body);
    await newCondo.save();
    res.status(201).json(newCondo); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = app; // ส่งออกไปให้ server.js รัน listen
const Condo = require('../models/Condo');

class CondoService {
    // 1. ดึงข้อมูลคอนโดทั้งหมด
    async getAllCondos() {
        return await Condo.find().sort({ createdAt: -1 }); // เอาห้องที่เพิ่มล่าสุดขึ้นก่อน
    }

    // 2. ดึงข้อมูลคอนโดรายห้องตาม ID
    async getCondoById(id) {
        return await Condo.findById(id);
    }

    // 3. เพิ่มข้อมูลคอนโดใหม่
    async createCondo(condoData) {
        const newCondo = new Condo(condoData);
        return await newCondo.save();
    }
}

module.exports = new CondoService();
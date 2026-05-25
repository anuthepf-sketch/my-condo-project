const condoService = require('../services/condoService');

// ดึงข้อมูลคอนโดทั้งหมด
exports.getCondos = async (req, res) => {
    try {
        const condos = await condoService.getAllCondos();
        res.status(200).json(condos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching condos", error: error.message });
    }
};

// ดึงข้อมูลรายห้อง
exports.getCondoById = async (req, res) => {
    try {
        const condo = await condoService.getCondoById(req.params.id);
        if (!condo) return res.status(404).json({ message: "Condo not found" });
        res.status(200).json(condo);
    } catch (error) {
        res.status(500).json({ message: "Error fetching condo detail", error: error.message });
    }
};

// เพิ่มคอนโดใหม่
exports.createCondo = async (req, res) => {
    try {
        // ใน Phaseแรกนี้ เรายังไม่ทำระบบอัปโหลดรูป ให้รับเป็นข้อมูล JSON ธรรมดาเข้ามาก่อนเพื่อทดสอบ
        const savedCondo = await condoService.createCondo(req.body);
        res.status(201).json({ message: "Condo created successfully", data: savedCondo });
    } catch (error) {
        res.status(400).json({ message: "Error creating condo", error: error.message });
    }
};
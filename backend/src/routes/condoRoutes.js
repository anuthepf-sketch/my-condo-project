const express = require('express');
const router = express.Router();
const condoController = require('../controllers/condoController');

// 🗺️ แผนที่เส้นทางของ API คอนโด
router.get('/', condoController.getCondos);          // GET http://localhost:5000/api/condos
router.get('/:id', condoController.getCondoById);    // GET http://localhost:5000/api/condos/ไอดีห้อง
router.post('/', condoController.createCondo);       // POST http://localhost:5000/api/condos

module.exports = router;
const mongoose = require('mongoose');

const CondoSchema = new mongoose.Schema({
    title: { type: String, required: true },       // ชื่อคอนโด (ซ้ำกันได้ เช่น Super Condo)
    roomNumber: { type: String, required: true },  // รหัสห้อง/เลขห้อง (เช่น 123/45)
    description: { type: String, required: true }, 
    price: { type: Number, required: true },       
    location: { type: String, required: true },    
    size: { type: Number, required: true },        
    bedrooms: { type: Number, required: true },    
    bathrooms: { type: Number, required: true },   
    images: [{ type: String }],                    
    status: { type: String, default: 'available' } 
}, {
    timestamps: true 
});

// 🔥 สร้างกฎเหล็กให้ Database เทส: ห้ามมี "ชื่อคอนโด + เลขห้อง" ซ้ำกันเด็ดขาด!
CondoSchema.index({ title: 1, roomNumber: 1 }, { unique: true });

module.exports = mongoose.model('Condo', CondoSchema);
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [condos, setCondos] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [formData, setFormData] = useState({
    title: '', roomNumber: '', description: '', price: '', location: '', size: '', bedrooms: '1', bathrooms: '1'
  })

  const fetchCondos = () => {
    fetch('http://localhost:5000/api/condos')
      .then(response => response.json())
      .then(data => { setCondos(data); setLoading(false); })
      .catch(error => { console.error('Error fetching condos:', error); setLoading(false); })
  }

  useEffect(() => { fetchCondos() }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:5000/api/condos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        price: Number(formData.price),
        size: Number(formData.size),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms)
      })
    })
    .then(response => {
      if (response.status === 201) {
        fetchCondos() 
        setFormData({ title: '', roomNumber: '', description: '', price: '', location: '', size: '', bedrooms: '1', bathrooms: '1' })
      } else {
        console.error('❌ เกิดข้อผิดพลาด หรือ ข้อมูลคอนโดและเลขห้องนี้มีอยู่แล้ว!')
      }
    })
    .catch(error => console.error('Error:', error))
  }

  return (
    <div className="container">
      <h1>🏢 Condo Management System</h1>
      <p className="subtitle">ระบบจำลองดูข้อมูลห้องชุดเพื่อการทำ Automation Test</p>
      
      <div className="form-section">
        <h2>➕ เพิ่มประกาศคอนโดห้องใหม่</h2>
        <form onSubmit={handleSubmit} id="condo-form">
          <div className="form-group">
            <label>ชื่อโครงการคอนโด:</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="เช่น Super Condo Sukhumvit" />
          </div>
          <div className="form-group">
            <label>เลขที่ห้อง (Room Number):</label>
            <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleChange} required placeholder="เช่น 99/999" />
          </div>
          <div className="form-group">
            <label>รายละเอียด:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required placeholder="ระบุรายละเอียดห้อง..." />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>ราคาเช่า (บาท/เดือน):</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required placeholder="เช่น 15000" />
            </div>
            <div className="form-group">
              <label>ทำเล/สถานที่ใกล้เคียง:</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="เช่น BTS อ่อนนุช" />
            </div>
            <div className="form-group">
              <label>ขนาดพื้นที่ (ตรม.):</label>
              <input type="number" name="size" value={formData.size} onChange={handleChange} required placeholder="35" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>จำนวนห้องนอน:</label>
              <select name="bedrooms" value={formData.bedrooms} onChange={handleChange}>
                <option value="1">1 ห้องนอน</option>
                <option value="2">2 ห้องนอน</option>
                <option value="3">3 ห้องนอน</option>
              </select>
            </div>
            <div className="form-group">
              <label>จำนวนห้องน้ำ:</label>
              <select name="bathrooms" value={formData.bathrooms} onChange={handleChange}>
                <option value="1">1 ห้องน้ำ</option>
                <option value="2">2 ห้องน้ำ</option>
              </select>
            </div>
          </div>
          <button type="submit" className="submit-btn">บันทึกข้อมูลคอนโด</button>
        </form>
      </div>

      <hr className="divider" />

      <h2>📋 รายการคอนโดทั้งหมดในระบบ</h2>
      {loading ? ( <p>กำลังโหลดข้อมูลคอนโด...</p> ) : condos.length === 0 ? ( <p>ยังไม่มีข้อมูลคอนโดในระบบ</p> ) : (
        <div className="condo-grid">
          {condos.map((condo) => (
            <div key={condo._id} className="condo-card">
              <h2>{condo.title}</h2>
              <p className="room-num"><strong>ห้องเลขที่:</strong> {condo.roomNumber}</p>
              <p className="desc">{condo.description}</p>
              <div className="details">
                <span>📏 {condo.size} ตรม.</span>
                <span>🛏️ {condo.bedrooms} นอน</span>
                <span>🚿 {condo.bathrooms} น้ำ</span>
              </div>
              <p className="price">💰 {condo.price.toLocaleString()} บาท/เดือน</p>
              <span className="status-badge">{condo.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
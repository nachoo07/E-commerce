import React from 'react'
import '../contact/contactInfo.css';

const ContactInfo = () => {
  return (
    <>
     <div className="contact-info-section">
      <div className="contact-info-item">
        <span className="contact-icon">📍</span>
        <p>Dirección</p>
        <p>Av. Centenario 901, San Isidro, Buenos Aires.</p>
        <p>Lun a Vie: 9:30 a 18:30 y Sáb: 9:30 a 14:00</p>
      </div>
      <div className="contact-info-item">
        <span className="contact-icon">📞</span>
        <p>Teléfonos</p>
        <p>Consultas: 4742-2999</p>
        <p>Ventas y Postventa: 11-3628-1021</p>
      </div>
      <div className="contact-info-item">
        <span className="contact-icon">✉️</span>
        <p>Email</p>
        <p>info@iluminacionda.com</p>
      </div>
    </div>
    </>
  )
}

export default ContactInfo
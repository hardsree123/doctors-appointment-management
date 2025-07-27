import React from 'react'
import './ContactActions.css'

const ContactActions = ({ contact, loading = false }) => {
  const handleCall = () => {
    if (contact?.phone) {
      // Trigger native call app
      window.location.href = `tel:${contact.phone}`
    }
  }

  const handleMessage = () => {
    if (contact?.phone) {
      // Trigger native messaging app
      const message = encodeURIComponent('Hi Dr. Somasree, I would like to inquire about an appointment.')
      
      // Try WhatsApp first, then fallback to SMS
      const whatsappUrl = `https://wa.me/${contact.phone.replace(/[^\d]/g, '')}?text=${message}`
      const smsUrl = `sms:${contact.phone}?body=${message}`
      
      // Check if we're on mobile to prefer WhatsApp
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      
      if (isMobile) {
        // Try WhatsApp first on mobile
        const whatsappWindow = window.open(whatsappUrl, '_blank')
        
        // If WhatsApp fails, fallback to SMS after a short delay
        setTimeout(() => {
          if (whatsappWindow && whatsappWindow.closed) {
            window.location.href = smsUrl
          }
        }, 1000)
      } else {
        // On desktop, show WhatsApp web
        window.open(whatsappUrl, '_blank')
      }
    }
  }

  if (loading) {
    return (
      <div className="contact-actions loading">
        <div className="skeleton-button"></div>
        <div className="skeleton-button"></div>
      </div>
    )
  }

  return (
    <div className="contact-actions">
      <button 
        className="message-btn" 
        onClick={handleMessage}
        disabled={!contact?.phone}
        aria-label="Send message to doctor"
      >
        💬 Message
      </button>
      <button 
        className="call-btn" 
        onClick={handleCall}
        disabled={!contact?.phone}
        aria-label="Call doctor"
      >
        📞 Call
      </button>
    </div>
  )
}

export default ContactActions

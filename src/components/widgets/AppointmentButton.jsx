import React from 'react'
import './AppointmentButton.css'

const AppointmentButton = ({ onBookAppointment, loading = false, disabled = false }) => {
  if (loading) {
    return (
      <div className="appointment-button-container">
        <div className="appointment-btn skeleton"></div>
      </div>
    )
  }

  return (
    <div className="appointment-button-container">
      <button 
        className="appointment-btn"
        onClick={onBookAppointment}
        disabled={disabled}
        aria-label="Book appointment with doctor"
      >
        {disabled ? 'Booking...' : 'Book An Appointment'}
      </button>
    </div>
  )
}

export default AppointmentButton

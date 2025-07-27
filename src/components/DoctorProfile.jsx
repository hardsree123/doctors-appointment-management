import React, { useState, useEffect } from 'react'
import doctorService from '../services/doctorService.js'
import DoctorHeader from './widgets/DoctorHeader'
import ContactActions from './widgets/ContactActions'
import DoctorStats from './widgets/DoctorStats'
import DoctorDetails from './widgets/DoctorDetails'
import AppointmentButton from './widgets/AppointmentButton'
import AppointmentModal from './AppointmentModal'
import './DoctorProfile.css'

const DoctorProfile = ({ doctorId = 'dr-somasree-rc' }) => {
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        setLoading(true)
        setError(null)
        const doctorData = await doctorService.getDoctorProfile(doctorId)
        setDoctor(doctorData)
      } catch (err) {
        setError(err.message || 'Failed to load doctor profile')
        console.error('Error fetching doctor profile:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDoctorProfile()
  }, [doctorId])

  const handleBookAppointment = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  if (error) {
    return (
      <div className="doctor-profile error">
        <div className="error-message">
          <h2>Unable to load doctor profile</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-btn"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="doctor-profile">
      <DoctorHeader doctor={doctor} loading={loading} />
      
      <ContactActions contact={doctor?.contact} loading={loading} />
      
      <DoctorStats stats={doctor?.stats} loading={loading} />
      
      <DoctorDetails doctor={doctor} loading={loading} />
      
      <AppointmentButton 
        onBookAppointment={handleBookAppointment}
        loading={loading}
        disabled={!doctor}
      />

      <AppointmentModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        doctorId={doctorId}
      />
    </div>
  )
}

export default DoctorProfile

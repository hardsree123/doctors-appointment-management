import React, { useState } from 'react'
import tokenService from '../services/tokenService.js'
import PatientInfoForm from './widgets/PatientInfoForm'
import DateTimeSelector from './widgets/DateTimeSelector'
import './AppointmentModal.css'

const AppointmentModal = ({ isOpen, onClose, doctorId = 'dr-somasree-rc' }) => {
  const [currentStep, setCurrentStep] = useState(1) // 1: Patient Info, 2: Date/Time, 3: Token Generated
  const [patientData, setPatientData] = useState(null)
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    isValid: false
  })
  const [isGeneratingToken, setIsGeneratingToken] = useState(false)
  const [tokenResult, setTokenResult] = useState(null)
  const [error, setError] = useState('')

  const handlePatientSubmitted = (data) => {
    setPatientData(data)
    setCurrentStep(2)
    setError('')
  }

  const handleDateTimeSelection = (selection) => {
    setAppointmentData(selection)
  }

  const handleGenerateToken = async () => {
    if (!patientData || !appointmentData.isValid) return

    setIsGeneratingToken(true)
    setError('')

    try {
      const tokenData = {
        patientId: patientData.patientId,
        doctorId,
        date: appointmentData.date,
        time: appointmentData.time,
        reason: patientData.reason
      }

      const result = await tokenService.generateToken(tokenData)
      
      if (result.success) {
        setTokenResult(result)
        setCurrentStep(3)
      }
    } catch (err) {
      setError(err.message || 'Unable to generate appointment token. Please try again.')
    } finally {
      setIsGeneratingToken(false)
    }
  }

  const handleClose = () => {
    setCurrentStep(1)
    setPatientData(null)
    setAppointmentData({ date: '', time: '', isValid: false })
    setTokenResult(null)
    setError('')
    onClose()
  }

  const handleBookAnother = () => {
    setCurrentStep(1)
    setPatientData(null)
    setAppointmentData({ date: '', time: '', isValid: false })
    setTokenResult(null)
    setError('')
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {currentStep === 1 && 'Book Appointment - Step 1 of 2'}
            {currentStep === 2 && 'Book Appointment - Step 2 of 2'}
            {currentStep === 3 && 'Appointment Confirmed'}
          </h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>

        {/* Progress Indicator */}
        <div className="progress-indicator">
          <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Patient Info</span>
          </div>
          <div className="progress-line"></div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Date & Time</span>
          </div>
          <div className="progress-line"></div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Token</span>
          </div>
        </div>

        {error && (
          <div className="message error">
            {error}
          </div>
        )}

        {/* Step 1: Patient Information */}
        {currentStep === 1 && (
          <PatientInfoForm 
            onPatientSubmitted={handlePatientSubmitted}
          />
        )}

        {/* Step 2: Date & Time Selection */}
        {currentStep === 2 && (
          <>
            <DateTimeSelector
              doctorId={doctorId}
              onSelectionChange={handleDateTimeSelection}
              disabled={isGeneratingToken}
            />
            
            <div className="step-actions">
              <button 
                className="back-btn"
                onClick={() => setCurrentStep(1)}
                disabled={isGeneratingToken}
              >
                Back to Patient Info
              </button>
              <button 
                className="generate-token-btn"
                onClick={handleGenerateToken}
                disabled={!appointmentData.isValid || isGeneratingToken}
              >
                {isGeneratingToken ? 'Generating Token...' : 'Generate Appointment Token'}
              </button>
            </div>
          </>
        )}

        {/* Step 3: Token Generated */}
        {currentStep === 3 && tokenResult && (
          <div className="token-result">
            <div className="success-icon">🎉</div>
            <h3>Appointment Confirmed!</h3>
            <div className="token-display">
              <div className="token-number">
                Token Number: <strong>{tokenResult.tokenNumber}</strong>
              </div>
              <div className="appointment-id">
                Appointment ID: {tokenResult.appointmentId}
              </div>
            </div>
            
            <div className="appointment-details">
              <h4>Appointment Details</h4>
              <div className="detail-row">
                <span>Patient:</span>
                <span>{patientData.patientData.name}</span>
              </div>
              <div className="detail-row">
                <span>Date:</span>
                <span>{new Date(appointmentData.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="detail-row">
                <span>Time:</span>
                <span>{appointmentData.time}</span>
              </div>
              <div className="detail-row">
                <span>Estimated Wait:</span>
                <span>{tokenResult.appointment.estimatedWaitTime} minutes</span>
              </div>
            </div>

            <div className="token-actions">
              <button 
                className="book-another-btn"
                onClick={handleBookAnother}
              >
                Book Another Appointment
              </button>
              <button 
                className="done-btn"
                onClick={handleClose}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AppointmentModal

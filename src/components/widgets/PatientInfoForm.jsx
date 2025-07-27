import React, { useState } from 'react'
import patientService from '../../services/patientService.js'
import './PatientInfoForm.css'

const PatientInfoForm = ({ onPatientSubmitted, isSubmitting: externalSubmitting = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const result = await patientService.submitPatientInfo(formData)
      
      if (result.success) {
        setSubmitMessage(result.message)
        
        // Notify parent component with patient data
        if (onPatientSubmitted) {
          onPatientSubmitted({
            patientId: result.patientId,
            patientData: result.patient,
            reason: formData.reason
          })
        }
      }
    } catch (error) {
      setSubmitMessage(error.message || 'Unable to save patient information. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormDisabled = isSubmitting || externalSubmitting

  return (
    <div className="patient-info-form">
      <h3>Patient Information</h3>
      
      {submitMessage && (
        <div className={`message ${submitMessage.includes('successfully') ? 'success' : 'error'}`}>
          {submitMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={isFormDisabled}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isFormDisabled}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+1 (555) 123-4567"
            disabled={isFormDisabled}
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason for Visit</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            rows="3"
            placeholder="Brief description of your health concern..."
            disabled={isFormDisabled}
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isFormDisabled}
        >
          {isSubmitting ? 'Saving Information...' : 'Save Patient Information'}
        </button>
      </form>
    </div>
  )
}

export default PatientInfoForm

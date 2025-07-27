import React from 'react'
import './DoctorHeader.css'

const DoctorHeader = ({ doctor, loading = false }) => {
  if (loading) {
    return (
      <div className="doctor-header loading">
        <div className="skeleton-image"></div>
        <div className="skeleton-info">
          <div className="skeleton-line skeleton-name"></div>
          <div className="skeleton-line skeleton-qualifications"></div>
          <div className="skeleton-line skeleton-specialization"></div>
          <div className="skeleton-line skeleton-rating"></div>
        </div>
      </div>
    )
  }

  if (!doctor) return null

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    
    return (
      <>
        {'★'.repeat(fullStars)}
        {hasHalfStar && '☆'}
        {'☆'.repeat(emptyStars)}
      </>
    )
  }

  return (
    <div className="doctor-header">
      <div className="doctor-image">
        <img 
          src={doctor.image} 
          alt={doctor.name} 
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <div className="image-placeholder">
          <span>👨‍⚕️</span>
        </div>
      </div>
      
      <div className="doctor-info">
        <div className="doctor-name">
          <h1>{doctor.name}</h1>
          {doctor.isVerified && (
            <div className="verification-badge">✓</div>
          )}
        </div>
        
        <p className="qualifications">
          {doctor.qualifications.join(' • ')}
        </p>
        <p className="specialization">{doctor.specialization}</p>
        
        <div className="rating">
          <div className="stars">
            {renderStars(doctor.rating.stars)}
          </div>
          <span className="rating-text">{doctor.rating.stars} Star</span>
        </div>
      </div>
    </div>
  )
}

export default DoctorHeader

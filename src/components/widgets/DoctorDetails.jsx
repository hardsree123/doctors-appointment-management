import React from 'react'
import './DoctorDetails.css'

const DoctorDetails = ({ doctor, loading = false }) => {
  if (loading) {
    return (
      <div className="doctor-details loading">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="detail-item">
            <div className="skeleton-line skeleton-title"></div>
            <div className="skeleton-line skeleton-content"></div>
            <div className="skeleton-line skeleton-content-short"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!doctor) return null

  return (
    <div className="doctor-details">
      <div className="detail-item">
        <h3>About</h3>
        <p>{doctor.about}</p>
      </div>

      <div className="detail-item">
        <h3>Education</h3>
        <div className="education-list">
          {doctor.education.map((edu, index) => (
            <p key={index}>{edu}</p>
          ))}
        </div>
      </div>

      <div className="detail-item">
        <h3>Location</h3>
        <p>{doctor.location.clinic}</p>
        <p>{doctor.location.address}</p>
        <p>{doctor.location.city}</p>
      </div>

      <div className="detail-item">
        <h3>Working Time</h3>
        <p>{doctor.workingHours.time}</p>
        <p className="days">{doctor.workingHours.days}</p>
      </div>
    </div>
  )
}

export default DoctorDetails

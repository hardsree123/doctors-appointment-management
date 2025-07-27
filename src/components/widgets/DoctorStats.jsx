import React from 'react'
import './DoctorStats.css'

const DoctorStats = ({ stats, loading = false }) => {
  if (loading) {
    return (
      <div className="doctor-stats loading">
        <div className="stat-item">
          <div className="skeleton-line skeleton-number"></div>
          <div className="skeleton-line skeleton-label"></div>
        </div>
        <div className="stat-item">
          <div className="skeleton-line skeleton-number"></div>
          <div className="skeleton-line skeleton-label"></div>
        </div>
        <div className="stat-item">
          <div className="skeleton-line skeleton-number"></div>
          <div className="skeleton-line skeleton-label"></div>
        </div>
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="doctor-stats">
      <div className="stat-item">
        <h3>{stats.patients}</h3>
        <p>Patients</p>
      </div>
      <div className="stat-item">
        <h3>{stats.experience}</h3>
        <p>Experience</p>
      </div>
      <div className="stat-item">
        <h3>{stats.reviews}</h3>
        <p>Reviews</p>
      </div>
    </div>
  )
}

export default DoctorStats

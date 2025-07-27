import React, { useState, useEffect, useCallback } from 'react'
import tokenService from '../../services/tokenService.js'
import './DateTimeSelector.css'

const DateTimeSelector = ({ 
  doctorId, 
  onSelectionChange, 
  disabled = false,
  selectedDate = '',
  selectedTime = ''
}) => {
  const [availableDates, setAvailableDates] = useState([])
  const [timeSlots, setTimeSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [currentDate, setCurrentDate] = useState(selectedDate)
  const [currentTime, setCurrentTime] = useState(selectedTime)

  const generateAvailableDates = useCallback(() => {
    const dates = []
    const today = new Date()
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      // Skip Sundays (assuming doctor doesn't work on Sundays)
      if (date.getDay() !== 0) {
        dates.push({
          date: date.toISOString().split('T')[0],
          day: date.getDate(),
          dayName: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
          month: date.toLocaleDateString('en-US', { month: 'short' }),
          isToday: i === 0
        })
      }
    }
    
    setAvailableDates(dates)
  }, [])

  const fetchTimeSlots = useCallback(async (date) => {
    setLoadingSlots(true)
    try {
      const slots = await tokenService.getTimeSlots(doctorId, date)
      setTimeSlots(slots)
      
      // Clear selected time if it's not available in new slots
      if (currentTime && !slots.find(slot => slot.time === currentTime && slot.available)) {
        setCurrentTime('')
      }
    } catch (error) {
      console.error('Error fetching time slots:', error)
      setTimeSlots([])
    } finally {
      setLoadingSlots(false)
    }
  }, [doctorId, currentTime])

  useEffect(() => {
    generateAvailableDates()
  }, [generateAvailableDates])

  useEffect(() => {
    if (currentDate && doctorId) {
      fetchTimeSlots(currentDate)
    }
  }, [currentDate, doctorId, fetchTimeSlots])

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange({
        date: currentDate,
        time: currentTime,
        isValid: currentDate && currentTime
      })
    }
  }, [currentDate, currentTime, onSelectionChange])

  const handleDateSelection = (date) => {
    if (disabled) return
    setCurrentDate(date)
    setCurrentTime('') // Reset time selection when date changes
  }

  const handleTimeSelection = (time) => {
    if (disabled) return
    setCurrentTime(time)
  }

  return (
    <div className="datetime-selector">
      <h3>Select Date & Time</h3>
      
      {/* Date Selection */}
      <div className="date-section">
        <h4>Available Dates</h4>
        <div className="date-grid">
          {availableDates.map((dateInfo) => (
            <button
              key={dateInfo.date}
              className={`date-card ${currentDate === dateInfo.date ? 'selected' : ''} ${dateInfo.isToday ? 'today' : ''}`}
              onClick={() => handleDateSelection(dateInfo.date)}
              disabled={disabled}
            >
              <div className="date-number">{dateInfo.day}</div>
              <div className="date-day">{dateInfo.dayName}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {currentDate && (
        <div className="time-section">
          <h4>Available Time Slots</h4>
          {loadingSlots ? (
            <div className="loading-slots">
              <div className="skeleton-slot"></div>
              <div className="skeleton-slot"></div>
              <div className="skeleton-slot"></div>
              <div className="skeleton-slot"></div>
            </div>
          ) : (
            <div className="time-grid">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  className={`time-slot ${currentTime === slot.time ? 'selected' : ''} ${!slot.available ? 'unavailable' : ''}`}
                  onClick={() => handleTimeSelection(slot.time)}
                  disabled={disabled || !slot.available}
                >
                  <div className="time-label">{slot.label}</div>
                  <div className="booking-count">
                    {slot.bookingCount} {slot.bookingCount === 1 ? 'booking' : 'bookings'}
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {timeSlots.length === 0 && !loadingSlots && (
            <div className="no-slots">
              No available time slots for this date
            </div>
          )}
        </div>
      )}

      {/* Selection Summary */}
      {currentDate && currentTime && (
        <div className="selection-summary">
          <h4>Selected Appointment</h4>
          <div className="summary-info">
            <span className="summary-date">
              {new Date(currentDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="summary-time">
              {timeSlots.find(slot => slot.time === currentTime)?.label}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default DateTimeSelector

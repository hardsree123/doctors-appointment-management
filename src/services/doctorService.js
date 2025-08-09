// import httpClient from './httpClient.js' // Uncomment when backend API is ready

/**
 * Doctor API service for managing doctor-related data
 */
class DoctorService {
  /**
   * Get doctor profile by ID
   * @param {string} doctorId - The doctor's unique identifier
   * @returns {Promise<Object>} Doctor profile data
   */
  async getDoctorProfile(doctorId) {
    // For now, return mock data. Replace with actual API call when backend is ready
    // return await httpClient.get(`/api/doctors/${doctorId}`)
    
    return await this.getMockDoctorProfile(doctorId)
  }

  /**
   * Book an appointment with a doctor
   * @param {string} doctorId - The doctor's unique identifier
   * @param {Object} appointmentData - Appointment booking data
   * @returns {Promise<Object>} Booking confirmation
   */
  async bookAppointment(doctorId, appointmentData) {
    // For now, simulate API call. Replace with actual API call when backend is ready
    // return await httpClient.post(`/api/doctors/${doctorId}/appointments`, appointmentData)
    
    return await this.simulateAppointmentBooking(doctorId, appointmentData)
  }

  /**
   * Get doctor's available time slots
   * @param {string} doctorId - The doctor's unique identifier
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Promise<Array>} Available time slots
   */
  async getAvailableSlots(doctorId, date) {
    // For now, return mock data. Replace with actual API call when backend is ready
    // return await httpClient.get(`/api/doctors/${doctorId}/slots?date=${date}`)
    
    return await this.getMockAvailableSlots(date)
  }

  /**
   * Mock data for development - Remove when backend is ready
   */
  getMockDoctorProfile(doctorId = 'dr-somasree-rc') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: doctorId,
          name: 'Dr. Somasree R C',
          qualifications: ['BAMS', 'CRAV (Sports medicine)', 'PGDYE'],
          specialization: 'Ayurveda Practitioner',
          image: '/doctor-placeholder.jpg',
          isVerified: true,
          rating: {
            stars: 4.5,
            total: 6800
          },
          stats: {
            patients: '1.2k',
            experience: '8 Years',
            reviews: '1.3k'
          },
          about: 'Experienced Ayurveda practitioner specializing in traditional healing methods, sports medicine applications, and yoga therapy. Dedicated to providing holistic healthcare solutions with personalized treatment approaches for optimal wellness.',
          education: [
            'BAMS - Bachelor of Ayurvedic Medicine and Surgery',
            'CRAV - Certificate in Sports Medicine',
            'PGDYE - Post Graduate Diploma in Yoga Education'
          ],
          location: {
            clinic: 'Itoozhi Ayurveda',
            address: 'Mayyil P O',
            city: 'Kannur'
          },
          workingHours: {
            time: '8:00 AM to 6:00 PM',
            days: 'Monday - Saturday'
          },
          contact: {
            phone: '+919539581258',
            email: 'dr.somasree@doctor-mail.com'
          }
        })
      }, 500) // Simulate network delay
    })
  }

  getMockAvailableSlots() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          '09:00', '10:00', '11:00', '12:00',
          '14:00', '15:00', '16:00', '17:00'
        ])
      }, 300)
    })
  }

  simulateAppointmentBooking(doctorId, appointmentData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demonstration
        if (Math.random() > 0.1) { // 90% success rate
          resolve({
            success: true,
            bookingId: `APT-${Date.now()}`,
            message: 'Appointment booked successfully! You can visit Dr. Somasree for the booked appointment.',
            appointment: {
              ...appointmentData,
              doctorId,
              status: 'confirmed',
              createdAt: new Date().toISOString()
            }
          })
        } else {
          reject(new Error('Unable to book appointment. Please try again later.'))
        }
      }, 1000)
    })
  }
}

// Create and export a singleton instance
const doctorService = new DoctorService()

export default doctorService

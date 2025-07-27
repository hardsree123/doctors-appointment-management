// import httpClient from './httpClient.js' // Uncomment when backend API is ready

/**
 * Patient Information Service for managing patient data
 */
class PatientService {
  /**
   * Submit patient information
   * @param {Object} patientData - Patient information
   * @returns {Promise<Object>} Patient submission result
   */
  async submitPatientInfo(patientData) {
    // For now, simulate API call. Replace with actual API call when backend is ready
    // return await httpClient.post('/api/patients', patientData)
    
    return await this.simulatePatientSubmission(patientData)
  }

  /**
   * Get patient information by ID
   * @param {string} patientId - Patient's unique identifier
   * @returns {Promise<Object>} Patient information
   */
  async getPatientInfo(patientId) {
    // For now, simulate API call. Replace with actual API call when backend is ready
    // return await httpClient.get(`/api/patients/${patientId}`)
    
    return await this.simulateGetPatientInfo(patientId)
  }

  /**
   * Mock patient submission for development
   */
  simulatePatientSubmission(patientData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demonstration
        if (Math.random() > 0.05) { // 95% success rate
          const patientId = `PAT-${Date.now()}`
          resolve({
            success: true,
            patientId,
            message: 'Patient information saved successfully!',
            patient: {
              ...patientData,
              id: patientId,
              createdAt: new Date().toISOString(),
              status: 'registered'
            }
          })
        } else {
          reject(new Error('Unable to save patient information. Please try again.'))
        }
      }, 800)
    })
  }

  /**
   * Mock get patient info for development
   */
  simulateGetPatientInfo(patientId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (patientId && patientId.startsWith('PAT-')) {
          resolve({
            id: patientId,
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1234567890',
            createdAt: new Date().toISOString(),
            status: 'registered'
          })
        } else {
          reject(new Error('Patient not found'))
        }
      }, 300)
    })
  }
}

// Create and export a singleton instance
const patientService = new PatientService()

export default patientService

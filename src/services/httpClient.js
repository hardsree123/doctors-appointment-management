/**
 * Shared HTTP client for API calls
 */
class HttpClient {
  constructor(baseURL = '') {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: { ...this.defaultHeaders, ...options.headers },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return await response.json()
      }
      
      return await response.text()
    } catch (error) {
      console.error('HTTP Client Error:', error)
      throw error
    }
  }

  async get(endpoint, headers = {}) {
    return this.request(endpoint, {
      method: 'GET',
      headers,
    })
  }

  async post(endpoint, data, headers = {}) {
    return this.request(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
  }

  async put(endpoint, data, headers = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    })
  }

  async delete(endpoint, headers = {}) {
    return this.request(endpoint, {
      method: 'DELETE',
      headers,
    })
  }
}

// Create and export a singleton instance
const httpClient = new HttpClient(import.meta.env.VITE_API_BASE_URL || '')

export default httpClient

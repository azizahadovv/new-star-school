import { toast } from 'react-toastify'
import axios from './api'

// Maktab sozlamalari (singleton) — admin to'liq boshqaradi.
// GET ochiq, PUT faqat ADMIN. Token shared/api.js interceptor orqali qo'shiladi.
const schoolSettingsService = {
  async get() {
    try {
      const { data } = await axios.get(`v1/school-settings`)
      return data
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
      return null
    }
  },
  async update(body) {
    const { data } = await axios.put(`v1/school-settings`, body)
    return data
  },
}

export default schoolSettingsService

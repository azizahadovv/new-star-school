import { toast } from 'react-toastify'
import axios from './api'

// Akademik choraklar (terms) — admin to'liq boshqaradi.
// Backend: /api/v1/terms (ADMIN create/update/delete uchun avtorizatsiya qilingan).
// Token shared/api.js interceptor orqali qo'shiladi.
const TermControl = {
  async getAllTerms() {
    try {
      const { data } = await axios.get(`v1/terms`)
      return data
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
      return []
    }
  },
  async createTerm(body) {
    const { data } = await axios.post(`v1/terms`, body)
    return data
  },
  async updateTerm(id, body) {
    const { data } = await axios.put(`v1/terms/${id}`, body)
    return data
  },
  async deleteTerm(id) {
    await axios.delete(`v1/terms/${id}`)
  },
}

export default TermControl

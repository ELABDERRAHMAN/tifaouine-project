"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User, Calendar, Users } from "lucide-react"
import api from "../services/api"
import { useToast } from "../contexts/ToastContext"

const CreateOrphan = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "male",
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { showError, showSuccess } = useToast()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.post("/orphan-files", formData)
      showSuccess("تم إضافة اليتيم بنجاح")
      navigate("/orphan-files")
    } catch (error) {
      showError(error.response?.data?.message || "حدث خطأ في إضافة اليتيم")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">إضافة يتيم جديد</h1>
        <p className="text-gray-600 mt-2">أدخل بيانات اليتيم الأساسية</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              اسم اليتيم
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="input-field pr-10"
                placeholder="أدخل اسم اليتيم الكامل"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
              العمر
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="age"
                name="age"
                type="number"
                min="1"
                max="18"
                required
                className="input-field pr-10"
                placeholder="أدخل عمر اليتيم"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
              الجنس
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="gender"
                name="gender"
                required
                className="input-field pr-10 appearance-none"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="male">ذكر</option>
                <option value="female">أنثى</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4 space-x-reverse pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "جاري الإضافة..." : "إضافة اليتيم"}
            </button>
            <button type="button" onClick={() => navigate("/orphan-files")} className="btn-secondary flex-1">
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateOrphan

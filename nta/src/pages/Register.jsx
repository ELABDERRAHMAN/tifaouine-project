"use client"

import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "../contexts/ToastContext"
import { Mail, Lock, User, Heart, Sparkles, Eye, EyeOff } from "lucide-react"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user, register } = useAuth()
  const { showSuccess, showError } = useToast()

  if (user) {
    return <Navigate to="/" replace />
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (formData.password !== formData.password_confirmation) {
      showError("كلمات المرور غير متطابقة")
      setLoading(false)
      return
    }

    const result = await register(formData.name, formData.email, formData.password, formData.password_confirmation)

    if (result.success) {
      showSuccess("مرحباً بك! تم إنشاء حسابك بنجاح")
    } else {
      showError(result.message)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-down">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 aurora-bg rounded-3xl flex items-center justify-center shadow-2xl floating-element">
                <Heart className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce-gentle">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-4 text-center">إنشاء حساب جديد</h1>
          <p className="text-gray-600 text-lg text-center">انضم إلى منصة رعاية الأيتام المتطورة</p>
        </div>

        {/* Register Form */}
        <div className="card-premium animate-slide-up">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold gradient-text">التسجيل</h2>
            <p className="text-gray-600 mt-2">أدخل بياناتك لإنشاء حساب جديد</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-3 text-center">
                الاسم الكامل
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <User className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="input-premium pr-12 text-lg text-center"
                  placeholder="أدخل اسمك الكامل"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3 text-center">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Mail className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input-premium pr-12 text-lg text-center"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-3 text-center">
                كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Lock className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="input-premium pr-12 pl-12 text-lg text-center"
                  placeholder="أدخل كلمة المرور"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 pl-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-bold text-gray-700 mb-3 text-center">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Lock className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className="input-premium pr-12 pl-12 text-lg text-center"
                  placeholder="أعد إدخال كلمة المرور"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 pl-4 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-premium w-full disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <div className="loading-dots">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <span>جاري إنشاء الحساب...</span>
                </div>
              ) : (
                "إنشاء حساب"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              لديك حساب بالفعل؟{" "}
              <Link to="/login" className="font-bold gradient-text hover:underline transition-all duration-300">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register

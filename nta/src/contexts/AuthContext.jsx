import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

// ✅ إعداد axios مبسط
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // ✅ تعطيل credentials مؤقتاً
})

// ✅ Interceptor مبسط
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token')
      const userData = localStorage.getItem('user_data')

      if (token && userData) {
        try {
          setUser(JSON.parse(userData))
        } catch (error) {
          console.error('Token verification failed:', error)
          localStorage.removeItem('auth_token')
          localStorage.removeItem('user_data')
          setUser(null)
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  // ✅ دالة تسجيل دخول مبسطة بدون CSRF
  const login = async (email, password) => {
    try {
      console.log('🔐 Starting simple login...')
      
      const response = await api.post('/auth/login', { 
        email, 
        password 
      })
      
      console.log('📥 Login response:', response.status)

      if (response.data.success) {
        const { token, user: userData } = response.data
        
        localStorage.setItem('auth_token', token)
        localStorage.setItem('user_data', JSON.stringify(userData))
        setUser(userData)
        
        console.log('✅ Login successful')
        return { success: true, message: response.data.message }
      }
      
      return { success: false, message: response.data.message }
      
    } catch (error) {
      console.error('❌ Login failed:', error)
      
      let message = 'حدث خطأ غير متوقع'
      
      if (error.response?.status === 401) {
        message = 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
      } else if (error.response?.status === 422) {
        const errors = error.response.data.errors
        message = Object.values(errors)[0]?.[0] || 'خطأ في البيانات المدخلة'
      } else if (error.code === 'ERR_NETWORK') {
        message = 'خطأ في الشبكة. تأكد من تشغيل الخادم على المنفذ 8000'
      }
      
      return { success: false, message }
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      setUser(null)
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    api,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { useAuth }
export default AuthContext
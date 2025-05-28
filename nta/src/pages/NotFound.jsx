"use client"
import { Link } from "react-router-dom"
import { Home, ArrowRight } from "lucide-react"

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mt-4">الصفحة غير موجودة</h2>
          <p className="text-gray-600 mt-2">عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها</p>
        </div>

        <div className="space-y-4">
          <Link to="/" className="btn-primary w-full flex items-center justify-center">
            <Home className="h-5 w-5 ml-2" />
            العودة للرئيسية
          </Link>

          <button
            onClick={() => window.history.back()}
            className="btn-secondary w-full flex items-center justify-center"
          >
            <ArrowRight className="h-5 w-5 ml-2" />
            العودة للصفحة السابقة
          </button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>إذا كنت تعتقد أن هذا خطأ، يرجى التواصل مع الدعم الفني</p>
        </div>
      </div>
    </div>
  )
}

export default NotFound

"use client"
import { useAuth } from "../contexts/AuthContext"
import { LogOut, Bell } from "lucide-react"

const Header = () => {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">مرحباً بك في نظام إدارة كفالة الأيتام</h2>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="h-5 w-5" />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

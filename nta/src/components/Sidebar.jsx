import { Link, useLocation } from "react-router-dom"
import { Home, FileText, UserPlus, BarChart3, Settings, Users } from "lucide-react"

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    { path: "/", icon: Home, label: "الرئيسية" },
    { path: "/orphan-files", icon: FileText, label: "ملفات الأيتام" },
    { path: "/create-orphan", icon: UserPlus, label: "إضافة يتيم" },
    { path: "/statistics", icon: BarChart3, label: "الإحصائيات" },
    { path: "/settings", icon: Settings, label: "الإعدادات" },
  ]

  return (
    <div className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-6">
        <div className="flex items-center space-x-3 space-x-reverse">
          <Users className="h-8 w-8 text-primary-600" />
          <h1 className="text-xl font-bold text-gray-800">كفالة الأيتام</h1>
        </div>
      </div>

      <nav className="mt-6 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link key={item.path} to={item.path} className={`sidebar-item mb-2 ${isActive ? "active" : ""}`}>
              <Icon className="h-5 w-5 ml-3" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar

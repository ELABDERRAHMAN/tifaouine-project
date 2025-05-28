"use client"

import {
  Users,
  UserCheck,
  FileText,
  TrendingUp,
  Heart,
  Star,
  Award,
  Target,
  Zap,
  Crown,
  Calendar,
  DollarSign,
} from "lucide-react"
import { useStatistics } from "../hooks/useStatistics"
import { useEffect } from "react"

const Dashboard = () => {
  const { stats, loading, error, refetch } = useStatistics()

  useEffect(() => {
    // إعادة تحميل الإحصائيات كل 5 دقائق
    const interval = setInterval(
      () => {
        refetch()
      },
      5 * 60 * 1000,
    )

    return () => clearInterval(interval)
  }, [refetch])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="loading-dots mb-4">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={refetch} className="btn-premium">
            إعادة المحاولة
          </button>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: "إجمالي الأيتام",
      value: stats.total_orphans,
      icon: Users,
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      change: "+12 هذا الشهر",
    },
    {
      title: "الذكور",
      value: stats.male_count,
      icon: UserCheck,
      gradient: "from-green-500 via-emerald-500 to-lime-500",
      change: `${stats.total_orphans > 0 ? ((stats.male_count / stats.total_orphans) * 100).toFixed(1) : 0}%`,
    },
    {
      title: "الإناث",
      value: stats.female_count,
      icon: UserCheck,
      gradient: "from-pink-500 via-rose-500 to-red-500",
      change: `${stats.total_orphans > 0 ? ((stats.female_count / stats.total_orphans) * 100).toFixed(1) : 0}%`,
    },
    {
      title: "الملفات المرفوعة",
      value: stats.uploaded_files,
      icon: FileText,
      gradient: "from-purple-500 via-violet-500 to-indigo-500",
      change: "+28 هذا الأسبوع",
    },
  ]

  const quickActions = [
    {
      title: "إضافة يتيم جديد",
      description: "تسجيل يتيم جديد في النظام",
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
      path: "/create-orphan",
    },
    {
      title: "إدارة الملفات",
      description: "عرض وتحرير ملفات الأيتام",
      icon: FileText,
      gradient: "from-green-500 to-emerald-500",
      path: "/orphan-files",
    },
    {
      title: "الإحصائيات",
      description: "عرض التقارير والإحصائيات",
      icon: TrendingUp,
      gradient: "from-purple-500 to-violet-500",
      path: "/statistics",
    },
    {
      title: "الإعدادات",
      description: "إدارة إعدادات النظام",
      icon: Award,
      gradient: "from-orange-500 to-red-500",
      path: "/settings",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="premium-border">
          <div className="premium-border-content text-center py-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 aurora-bg rounded-3xl flex items-center justify-center shadow-2xl floating-element">
                  <Heart className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce-gentle">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-ping"></div>
              </div>
            </div>
            <h1 className="text-5xl font-bold gradient-text mb-4">لوحة التحكم الرئيسية</h1>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              إدارة شاملة ومتقدمة لنظام كفالة الأيتام مع أحدث التقنيات والأدوات المتطورة
            </p>
            <div className="flex justify-center items-center space-x-6 space-x-reverse">
              <div className="flex items-center space-x-2 space-x-reverse bg-white rounded-full px-4 py-2 shadow-lg">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">متصل بالخادم</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse bg-white rounded-full px-4 py-2 shadow-lg">
                <Zap className="h-4 w-4 text-yellow-500 animate-bounce-gentle" />
                <span className="text-sm font-medium text-gray-700">أداء متميز</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse bg-white rounded-full px-4 py-2 shadow-lg">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">{new Date().toLocaleDateString("ar-SA")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up border border-gray-100 text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-4">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${card.gradient} rounded-2xl flex items-center justify-center shadow-lg floating`}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{card.title}</h3>
              <p className="text-4xl font-bold gradient-text mb-2">{card.value}</p>
              <p className="text-sm text-gray-500">{card.change}</p>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 bg-gradient-to-r ${card.gradient} rounded-full transition-all duration-1000`}
                  style={{ width: `${Math.min((card.value / 400) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="text-center">
        <h2 className="text-3xl font-bold gradient-text mb-8">الإجراءات السريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in cursor-pointer group text-center"
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => (window.location.href = action.path)}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${action.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:floating transition-all duration-300`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:gradient-text transition-all duration-300">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-4 rounded-xl hover:scale-105 transition-all duration-300">
                  ابدأ الآن
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overview */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 aurora-bg rounded-2xl flex items-center justify-center shadow-lg floating">
              <Target className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold gradient-text mb-6">نظرة عامة على النظام</h3>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-blue-600">{stats.total_orphans}</p>
              <p className="text-sm text-gray-600">إجمالي الأيتام</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
              <div className="flex justify-center mb-2">
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-green-600">{stats.monthly_donations?.toLocaleString() || 0}</p>
              <p className="text-sm text-gray-600">التبرعات الشهرية</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">نسبة الذكور</span>
              <span className="font-bold text-blue-600">
                {stats.total_orphans > 0 ? ((stats.male_count / stats.total_orphans) * 100).toFixed(1) : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                style={{
                  width: `${stats.total_orphans > 0 ? (stats.male_count / stats.total_orphans) * 100 : 0}%`,
                }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">نسبة الإناث</span>
              <span className="font-bold text-pink-600">
                {stats.total_orphans > 0 ? ((stats.female_count / stats.total_orphans) * 100).toFixed(1) : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"
                style={{
                  width: `${stats.total_orphans > 0 ? (stats.female_count / stats.total_orphans) * 100 : 0}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 aurora-bg rounded-2xl flex items-center justify-center shadow-lg floating">
              <Award className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold gradient-text mb-6">حالة النظام</h3>

          <div className="space-y-6">
            {[
              { label: "الخادم", status: "متصل", color: "green", percentage: 100 },
              { label: "قاعدة البيانات", status: "نشطة", color: "blue", percentage: 98 },
              { label: "النسخ الاحتياطي", status: "محدث", color: "purple", percentage: 95 },
              { label: "الأمان", status: "محمي", color: "orange", percentage: 100 },
            ].map((item, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">{item.label}</span>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className={`w-3 h-3 bg-${item.color}-400 rounded-full animate-pulse`}></div>
                    <span className={`text-sm font-bold text-${item.color}-600`}>{item.status}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 bg-gradient-to-r from-${item.color}-400 to-${item.color}-600 rounded-full transition-all duration-1000`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
            <div className="flex justify-center items-center space-x-2 space-x-reverse">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-bold text-gray-800">النظام يعمل بكفاءة عالية</span>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 aurora-bg rounded-xl flex items-center justify-center shadow-lg floating">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold gradient-text">النشاطات الأخيرة</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "أيتام جدد",
              count: stats.total_orphans || "0",
              description: "إجمالي المسجلين",
              icon: Users,
              color: "blue",
            },
            {
              title: "ملفات مرفوعة",
              count: stats.uploaded_files || "0",
              description: "إجمالي الملفات",
              icon: FileText,
              color: "green",
            },
            {
              title: "كفلاء نشطين",
              count: stats.active_sponsors || "0",
              description: "إجمالي الكفلاء",
              icon: Heart,
              color: "purple",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="text-center bg-gray-50 rounded-xl p-6 animate-scale-in"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="flex justify-center mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-r from-${activity.color}-500 to-${activity.color}-600 rounded-xl flex items-center justify-center floating shadow-lg`}
                >
                  <activity.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">{activity.title}</h4>
              <p className={`text-3xl font-bold text-${activity.color}-600 mb-2`}>{activity.count}</p>
              <p className="text-sm text-gray-600">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

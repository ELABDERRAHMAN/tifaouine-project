import {
  Users,
  TrendingUp,
  Calendar,
  Zap,
  Star,
  Heart,
  DollarSign,
  Clock,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react"

const Statistics = () => {
  const stats = {
    total_orphans: 156,
    male_count: 89,
    female_count: 67,
    uploaded_files: 342,
    monthly_donations: 45000,
    active_sponsors: 78,
    completed_cases: 23,
    pending_cases: 12,
  }

  const malePercentage = ((stats.male_count / stats.total_orphans) * 100).toFixed(1)
  const femalePercentage = ((stats.female_count / stats.total_orphans) * 100).toFixed(1)

  const ageGroups = [
    { range: "0-5 سنوات", count: 45, percentage: 28.8, color: "from-blue-500 to-cyan-500" },
    { range: "6-10 سنوات", count: 62, percentage: 39.7, color: "from-green-500 to-emerald-500" },
    { range: "11-15 سنوات", count: 35, percentage: 22.4, color: "from-purple-500 to-violet-500" },
    { range: "16-18 سنة", count: 14, percentage: 9.0, color: "from-orange-500 to-red-500" },
  ]

  const monthlyData = [
    { month: "يناير", orphans: 142, donations: 38000, sponsors: 65 },
    { month: "فبراير", orphans: 145, donations: 41000, sponsors: 68 },
    { month: "مارس", orphans: 148, donations: 39500, sponsors: 72 },
    { month: "أبريل", orphans: 152, donations: 43000, sponsors: 75 },
    { month: "مايو", orphans: 156, donations: 45000, sponsors: 78 },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="premium-border">
        <div className="premium-border-content">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-6 space-x-reverse animate-slide-right">
              <div className="w-16 h-16 aurora-bg rounded-2xl flex items-center justify-center shadow-xl floating-element">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">الإحصائيات التفصيلية</h1>
                <p className="text-gray-600 text-lg">تحليل شامل ومتقدم لبيانات النظام والأداء</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse bg-white rounded-xl px-6 py-3 shadow-lg animate-slide-left">
              <Calendar className="h-6 w-6 text-blue-500" />
              <div>
                <p className="text-gray-500 text-sm">آخر تحديث</p>
                <p className="font-bold text-gray-800">{new Date().toLocaleDateString("ar-SA")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "إجمالي الأيتام",
            value: stats.total_orphans,
            icon: Users,
            gradient: "from-blue-500 to-cyan-500",
            change: "+12",
            changeType: "increase",
          },
          {
            title: "التبرعات الشهرية",
            value: `${stats.monthly_donations.toLocaleString()} ر.س`,
            icon: DollarSign,
            gradient: "from-green-500 to-emerald-500",
            change: "+8.5%",
            changeType: "increase",
          },
          {
            title: "الكفلاء النشطين",
            value: stats.active_sponsors,
            icon: Heart,
            gradient: "from-purple-500 to-violet-500",
            change: "+6",
            changeType: "increase",
          },
          {
            title: "الحالات المكتملة",
            value: stats.completed_cases,
            icon: CheckCircle,
            gradient: "from-orange-500 to-red-500",
            change: "+3",
            changeType: "increase",
          },
        ].map((card, index) => {
          const Icon = card.icon
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up border border-gray-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${card.gradient} rounded-xl flex items-center justify-center floating`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    card.changeType === "increase" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  }`}
                >
                  {card.change}
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gender Distribution */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-3">
              <PieChart className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">توزيع الأيتام حسب الجنس</h3>
          </div>

          <div className="space-y-6">
            {/* Male */}
            <div className="animate-slide-right">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg"></div>
                  <span className="font-medium text-gray-700">الذكور</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-800">{stats.male_count}</span>
                  <span className="text-sm text-gray-500 mr-2">({malePercentage}%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000"
                  style={{ width: `${malePercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Female */}
            <div className="animate-slide-left">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg"></div>
                  <span className="font-medium text-gray-700">الإناث</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-800">{stats.female_count}</span>
                  <span className="text-sm text-gray-500 mr-2">({femalePercentage}%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full transition-all duration-1000"
                  style={{ width: `${femalePercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mt-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{stats.male_count}</p>
                  <p className="text-sm text-gray-600">ذكور</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-pink-600">{stats.female_count}</p>
                  <p className="text-sm text-gray-600">إناث</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Age Groups Distribution */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-3">
              <Users className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">توزيع الأيتام حسب العمر</h3>
          </div>

          <div className="space-y-4">
            {ageGroups.map((group, index) => (
              <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">{group.range}</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-800">{group.count}</span>
                    <span className="text-sm text-gray-500 mr-2">({group.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 bg-gradient-to-r ${group.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${group.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mr-3">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">الاتجاهات الشهرية</h3>
          </div>
          <div className="flex space-x-2 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">الأيتام</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">التبرعات</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">الكفلاء</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-right py-3 px-4 font-semibold text-gray-700">الشهر</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">عدد الأيتام</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">التبرعات (ر.س)</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">الكفلاء</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">النمو</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((data, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-4 px-4 font-medium text-gray-800">{data.month}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-semibold text-gray-800">{data.orphans}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="font-semibold text-gray-800">{data.donations.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <Heart className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="font-semibold text-gray-800">{data.sponsors}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-green-600 font-semibold">+{Math.floor(Math.random() * 10) + 1}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "معدل الاستجابة",
            value: "94.5%",
            icon: Clock,
            description: "متوسط وقت الاستجابة للطلبات",
            color: "from-blue-500 to-cyan-500",
          },
          {
            title: "رضا الكفلاء",
            value: "4.8/5",
            icon: Star,
            description: "تقييم الكفلاء لجودة الخدمة",
            color: "from-yellow-500 to-orange-500",
          },
          {
            title: "كفاءة النظام",
            value: "98.2%",
            icon: Zap,
            description: "نسبة تشغيل النظام بدون أخطاء",
            color: "from-green-500 to-emerald-500",
          },
        ].map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center animate-scale-in"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div
              className={`w-16 h-16 bg-gradient-to-r ${metric.color} rounded-2xl flex items-center justify-center mx-auto mb-4 floating`}
            >
              <metric.icon className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">{metric.title}</h3>
            <p className="text-3xl font-bold gradient-text mb-2">{metric.value}</p>
            <p className="text-sm text-gray-600">{metric.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Statistics

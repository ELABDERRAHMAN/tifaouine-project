"use client"

import { useState } from "react"
import { Search, Filter, Download, Upload, UserPlus, Calendar, MapPin, Star, Heart } from "lucide-react"

const OrphanFiles = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGender, setFilterGender] = useState("all")

  const orphans = [
    { id: 1, name: "أحمد محمد علي", age: 12, gender: "male", created_at: "2024-01-15" },
    { id: 2, name: "فاطمة أحمد حسن", age: 8, gender: "female", created_at: "2024-01-20" },
    { id: 3, name: "محمد عبدالله سالم", age: 15, gender: "male", created_at: "2024-02-01" },
    { id: 4, name: "عائشة محمود طه", age: 10, gender: "female", created_at: "2024-02-10" },
    { id: 5, name: "يوسف إبراهيم أحمد", age: 14, gender: "male", created_at: "2024-02-15" },
    { id: 6, name: "زينب عبدالرحمن", age: 7, gender: "female", created_at: "2024-02-20" },
  ]

  const filteredOrphans = orphans.filter((orphan) => {
    const matchesSearch = orphan.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGender = filterGender === "all" || orphan.gender === filterGender
    return matchesSearch && matchesGender
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="neon-card p-8 cosmic-bg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center space-x-6 space-x-reverse animate-slide-right">
            <div className="w-16 h-16 aurora-bg rounded-2xl flex items-center justify-center shadow-glow floating">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold neon-text">ملفات الأيتام</h1>
              <p className="text-white/80 text-lg">إدارة شاملة لجميع ملفات الأيتام المسجلين</p>
            </div>
          </div>
          <button className="btn-premium animate-scale-in">
            <UserPlus className="h-5 w-5 ml-2" />
            إضافة يتيم جديد
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card-premium animate-slide-up">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white/40" />
            <input
              type="text"
              placeholder="البحث عن يتيم..."
              className="input-premium pr-12 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white/40" />
            <select
              className="input-premium pr-12 appearance-none min-w-48"
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
            >
              <option value="all">جميع الأجناس</option>
              <option value="male">ذكر</option>
              <option value="female">أنثى</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orphans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredOrphans.map((orphan, index) => (
          <div
            key={orphan.id}
            className="card-premium group hover:glow animate-slide-up shimmer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-glow floating ${
                    orphan.gender === "male"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                      : "bg-gradient-to-r from-pink-500 to-rose-500"
                  }`}
                >
                  <UserPlus className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold neon-text">{orphan.name}</h3>
                  <p className="text-white/60">رقم الملف: #{orphan.id.toString().padStart(3, "0")}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <Star className="h-5 w-5 text-yellow-400 animate-pulse" />
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    orphan.gender === "male"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                      : "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                  }`}
                >
                  {orphan.gender === "male" ? "ذكر" : "أنثى"}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-4 mb-8">
              <div className="glass-card p-4">
                <div className="flex items-center text-white/80">
                  <Calendar className="h-5 w-5 ml-3 text-blue-400" />
                  <span className="font-medium">العمر: {orphan.age} سنة</span>
                </div>
              </div>
              <div className="glass-card p-4">
                <div className="flex items-center text-white/80">
                  <MapPin className="h-5 w-5 ml-3 text-green-400" />
                  <span className="font-medium">
                    تاريخ التسجيل: {new Date(orphan.created_at).toLocaleDateString("ar-SA")}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 space-x-reverse">
              <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-4 rounded-2xl shadow-glow hover:shadow-glow-green transform hover:scale-105 transition-all duration-300 flex items-center justify-center group">
                <Download className="h-5 w-5 ml-2 group-hover:animate-bounce-gentle" />
                تحميل
              </button>
              <button className="flex-1 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white font-bold py-3 px-4 rounded-2xl shadow-glow hover:shadow-glow-purple transform hover:scale-105 transition-all duration-300 flex items-center justify-center group">
                <Upload className="h-5 w-5 ml-2 group-hover:animate-bounce-gentle" />
                رفع ملفات
              </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-ping"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-30 animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Stats Footer */}
      <div className="card-premium animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="animate-scale-in">
            <div className="w-16 h-16 aurora-bg rounded-2xl mx-auto mb-4 flex items-center justify-center floating shadow-glow">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <p className="text-4xl font-bold gradient-text">{filteredOrphans.length}</p>
            <p className="text-white/70">إجمالي الملفات المعروضة</p>
          </div>
          <div className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center floating shadow-glow">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <p className="text-4xl font-bold text-blue-400">
              {filteredOrphans.filter((o) => o.gender === "male").length}
            </p>
            <p className="text-white/70">ذكور</p>
          </div>
          <div className="animate-scale-in" style={{ animationDelay: "0.4s" }}>
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl mx-auto mb-4 flex items-center justify-center floating shadow-glow">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <p className="text-4xl font-bold text-pink-400">
              {filteredOrphans.filter((o) => o.gender === "female").length}
            </p>
            <p className="text-white/70">إناث</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrphanFiles

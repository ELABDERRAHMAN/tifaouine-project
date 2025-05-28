"use client"

import { useState } from "react"
import { SettingsIcon, Bell, Shield, Users, Save, Crown, Zap } from "lucide-react"

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    system: {
      auto_backup: true,
      data_retention: 365,
      max_file_size: 10,
    },
  })

  const handleNotificationChange = (key) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }))
  }

  const handleSystemChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      system: {
        ...prev.system,
        [key]: typeof prev.system[key] === "boolean" ? !prev.system[key] : value,
      },
    }))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="neon-card p-8 cosmic-bg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center space-x-6 space-x-reverse animate-slide-right">
            <div className="w-16 h-16 aurora-bg rounded-2xl flex items-center justify-center shadow-glow floating">
              <SettingsIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold neon-text">الإعدادات المتقدمة</h1>
              <p className="text-white/80 text-lg">تخصيص وإدارة إعدادات النظام</p>
            </div>
          </div>
          <button className="btn-premium animate-scale-in">
            <Save className="h-5 w-5 ml-2" />
            حفظ جميع الإعدادات
          </button>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Notification Settings */}
        <div className="card-premium animate-slide-up">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-glow ml-4 floating">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold gradient-text">إعدادات التنبيهات</h3>
          </div>

          <div className="space-y-6">
            {[
              {
                key: "email",
                title: "تنبيهات البريد الإلكتروني",
                description: "استقبال التنبيهات عبر البريد الإلكتروني",
                icon: "📧",
              },
              {
                key: "sms",
                title: "تنبيهات الرسائل النصية",
                description: "استقبال التنبيهات عبر الرسائل النصية",
                icon: "📱",
              },
              {
                key: "push",
                title: "التنبيهات الفورية",
                description: "استقبال التنبيهات الفورية في المتصفح",
                icon: "🔔",
              },
            ].map((notification, index) => (
              <div
                key={notification.key}
                className="glass-card p-6 animate-fade-in hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="text-2xl">{notification.icon}</div>
                    <div>
                      <p className="font-bold text-white">{notification.title}</p>
                      <p className="text-white/70 text-sm">{notification.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(notification.key)}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 ${
                      settings.notifications[notification.key]
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 shadow-glow-green"
                        : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
                        settings.notifications[notification.key] ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Settings */}
        <div className="card-premium animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-glow-purple ml-4 floating">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold gradient-text">إعدادات النظام</h3>
          </div>

          <div className="space-y-6">
            {/* Auto Backup Toggle */}
            <div className="glass-card p-6 animate-fade-in hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="text-2xl">💾</div>
                  <div>
                    <p className="font-bold text-white">النسخ الاحتياطي التلقائي</p>
                    <p className="text-white/70 text-sm">إنشاء نسخة احتياطية تلقائياً كل يوم</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSystemChange("auto_backup")}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 ${
                    settings.system.auto_backup
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 shadow-glow"
                      : "bg-white/20"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
                      settings.system.auto_backup ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Data Retention */}
            <div
              className="glass-card p-6 animate-fade-in hover:scale-105 transition-all duration-300"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center space-x-4 space-x-reverse mb-4">
                <div className="text-2xl">📅</div>
                <div>
                  <p className="font-bold text-white">مدة الاحتفاظ بالبيانات</p>
                  <p className="text-white/70 text-sm">عدد الأيام للاحتفاظ بالبيانات</p>
                </div>
              </div>
              <input
                type="number"
                className="input-premium w-full"
                value={settings.system.data_retention}
                onChange={(e) => handleSystemChange("data_retention", Number.parseInt(e.target.value))}
                placeholder="365"
              />
            </div>

            {/* Max File Size */}
            <div
              className="glass-card p-6 animate-fade-in hover:scale-105 transition-all duration-300"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-center space-x-4 space-x-reverse mb-4">
                <div className="text-2xl">📁</div>
                <div>
                  <p className="font-bold text-white">الحد الأقصى لحجم الملف</p>
                  <p className="text-white/70 text-sm">بالميجابايت</p>
                </div>
              </div>
              <input
                type="number"
                className="input-premium w-full"
                value={settings.system.max_file_size}
                onChange={(e) => handleSystemChange("max_file_size", Number.parseInt(e.target.value))}
                placeholder="10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="card-premium animate-fade-in">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 aurora-bg rounded-2xl flex items-center justify-center shadow-glow ml-4 floating">
            <Crown className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold gradient-text">معلومات النظام</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: SettingsIcon,
              title: "إصدار النظام",
              value: "v2.0.0 Premium",
              gradient: "from-blue-500 to-cyan-500",
              emoji: "⚙️",
            },
            {
              icon: Shield,
              title: "حالة الأمان",
              value: "محمي ومشفر",
              gradient: "from-green-500 to-emerald-500",
              emoji: "🛡️",
            },
            {
              icon: Users,
              title: "المستخدمين النشطين",
              value: "1 مدير",
              gradient: "from-purple-500 to-violet-500",
              emoji: "👥",
            },
          ].map((info, index) => (
            <div
              key={index}
              className="glass-card p-6 text-center animate-scale-in hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="text-4xl mb-4">{info.emoji}</div>
              <div
                className={`w-12 h-12 bg-gradient-to-r ${info.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 floating shadow-glow`}
              >
                <info.icon className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-bold neon-text mb-2">{info.title}</h4>
              <p className="text-white/70">{info.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Features */}
      <div className="card-premium animate-fade-in">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 aurora-bg rounded-2xl flex items-center justify-center shadow-glow ml-4 floating">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold gradient-text">الميزات المتقدمة</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "الذكاء الاصطناعي",
              description: "تحليل البيانات باستخدام الذكاء الاصطناعي",
              status: "قريباً",
              emoji: "🤖",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              title: "التقارير التلقائية",
              description: "إنشاء تقارير مفصلة تلقائياً",
              status: "متاح",
              emoji: "📊",
              gradient: "from-green-500 to-emerald-500",
            },
            {
              title: "التكامل مع الأنظمة الخارجية",
              description: "ربط النظام مع أنظمة أخرى",
              status: "قيد التطوير",
              emoji: "🔗",
              gradient: "from-purple-500 to-violet-500",
            },
            {
              title: "التطبيق المحمول",
              description: "تطبيق للهواتف الذكية",
              status: "قريباً",
              emoji: "📱",
              gradient: "from-orange-500 to-red-500",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="glass-card p-6 animate-slide-up hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center space-x-4 space-x-reverse mb-4">
                <div className="text-3xl">{feature.emoji}</div>
                <div className="flex-1">
                  <h4 className="font-bold neon-text">{feature.title}</h4>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    feature.status === "متاح"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500"
                      : feature.status === "قيد التطوير"
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                        : "bg-gradient-to-r from-gray-500 to-gray-600"
                  } text-white`}
                >
                  {feature.status}
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className={`h-2 bg-gradient-to-r ${feature.gradient} rounded-full transition-all duration-1000`}
                  style={{
                    width: feature.status === "متاح" ? "100%" : feature.status === "قيد التطوير" ? "60%" : "20%",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Settings

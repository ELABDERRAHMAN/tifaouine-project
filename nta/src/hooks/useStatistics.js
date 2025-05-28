"use client"

import { useState, useEffect } from "react"
import { statisticsAPI } from "../services/api"
import { useToast } from "../contexts/ToastContext"



export const useStatistics = () => {
  const [stats, setStats] = useState({
    total_orphans: 0,
    male_count: 0,
    female_count: 0,
    uploaded_files: 0,
    monthly_donations: 0,
    active_sponsors: 0,
    completed_cases: 0,
    pending_cases: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { showError } = useToast()

  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await statisticsAPI.getDashboard()

      if (response.success) {
        setStats(response.data)
      } else {
        setError(response.message)
        showError(response.message)
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "حدث خطأ في تحميل الإحصائيات"
      setError(errorMessage)
      showError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const fetchDetailedStats = async (params = {}) => {
    try {
      const response = await statisticsAPI.getDetailed(params)
      if (response.success) {
        return response.data
      } else {
        showError(response.message)
        return null
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "حدث خطأ في تحميل الإحصائيات التفصيلية"
      showError(errorMessage)
      return null
    }
  }

  const exportReport = async (type, params = {}) => {
    try {
      const blob = await statisticsAPI.exportReport(type, params)
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `report_${type}_${new Date().toISOString().split("T")[0]}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      return { success: true }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "حدث خطأ في تصدير التقرير"
      showError(errorMessage)
      return { success: false, message: errorMessage }
    }
  }

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  return {
    stats,
    loading,
    error,
    fetchDashboardStats,
    fetchDetailedStats,
    exportReport,
    refetch: fetchDashboardStats,
  }
}

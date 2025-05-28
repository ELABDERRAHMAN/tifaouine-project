"use client"

import { useState, useEffect } from "react"
import { orphansAPI } from "../services/api"
import { useToast } from "../contexts/ToastContext"

export const useOrphans = (params = {}) => {
  const [orphans, setOrphans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  })
  const { showError, showSuccess } = useToast()

  const fetchOrphans = async (searchParams = {}) => {
    try {
      setLoading(true)
      setError(null)
      const response = await orphansAPI.getAll({ ...params, ...searchParams })

      if (response.success) {
        setOrphans(response.data.orphans || response.data)
        setPagination(response.data.pagination || {})
      } else {
        setError(response.message)
        showError(response.message)
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "حدث خطأ في تحميل البيانات"
      setError(errorMessage)
      showError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const createOrphan = async (orphanData) => {
    try {
      const response = await orphansAPI.create(orphanData)
      if (response.success) {
        showSuccess("تم إضافة اليتيم بنجاح")
        fetchOrphans() // إعادة تحميل البيانات
        return { success: true, data: response.data }
      } else {
        showError(response.message)
        return { success: false, message: response.message }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "حدث خطأ في إضافة اليتيم"
      showError(errorMessage)
      return { success: false, message: errorMessage }
    }
  }

  const updateOrphan = async (id, orphanData) => {
    try {
      const response = await orphansAPI.update(id, orphanData)
      if (response.success) {
        showSuccess("تم تحديث بيانات اليتيم بنجاح")
        fetchOrphans() // إعادة تحميل البيانات
        return { success: true, data: response.data }
      } else {
        showError(response.message)
        return { success: false, message: response.message }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "حدث خطأ في تحديث البيانات"
      showError(errorMessage)
      return { success: false, message: errorMessage }
    }
  }

  const deleteOrphan = async (id) => {
    try {
      const response = await orphansAPI.delete(id)
      if (response.success) {
        showSuccess("تم حذف اليتيم بنجاح")
        fetchOrphans() // إعادة تحميل البيانات
        return { success: true }
      } else {
        showError(response.message)
        return { success: false, message: response.message }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "حدث خطأ في حذف اليتيم"
      showError(errorMessage)
      return { success: false, message: errorMessage }
    }
  }

  const uploadFiles = async (orphanId, files) => {
    try {
      const response = await orphansAPI.uploadFiles(orphanId, files)
      if (response.success) {
        showSuccess("تم رفع الملفات بنجاح")
        return { success: true, data: response.data }
      } else {
        showError(response.message)
        return { success: false, message: response.message }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "حدث خطأ في رفع الملفات"
      showError(errorMessage)
      return { success: false, message: errorMessage }
    }
  }

  useEffect(() => {
    fetchOrphans()
  }, [])

  return {
    orphans,
    loading,
    error,
    pagination,
    fetchOrphans,
    createOrphan,
    updateOrphan,
    deleteOrphan,
    uploadFiles,
    refetch: fetchOrphans,
  }
}

export const useOrphan = (id) => {
  const [orphan, setOrphan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { showError } = useToast()

  const fetchOrphan = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await orphansAPI.getById(id)

      if (response.success) {
        setOrphan(response.data)
      } else {
        setError(response.message)
        showError(response.message)
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "حدث خطأ في تحميل البيانات"
      setError(errorMessage)
      showError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchOrphan()
    }
  }, [id])

  return {
    orphan,
    loading,
    error,
    refetch: fetchOrphan,
  }
}

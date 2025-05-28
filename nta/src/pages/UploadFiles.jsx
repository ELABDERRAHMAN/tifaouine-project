"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Upload, FileText, X } from "lucide-react"
import api from "../services/api"
import { useToast } from "../contexts/ToastContext"

const UploadFiles = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [orphan, setOrphan] = useState(null)
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchingOrphan, setFetchingOrphan] = useState(true)
  const { showError, showSuccess } = useToast()

  useEffect(() => {
    fetchOrphan()
  }, [id])

  const fetchOrphan = async () => {
    try {
      const response = await api.get(`/orphan-files/${id}`)
      setOrphan(response.data)
    } catch (error) {
      showError("حدث خطأ في تحميل بيانات اليتيم")
      navigate("/orphan-files")
    } finally {
      setFetchingOrphan(false)
    }
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    const validFiles = selectedFiles.filter((file) => {
      const isValidType = file.type === "application/pdf" || file.type.startsWith("image/")
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB

      if (!isValidType) {
        showError(`الملف ${file.name} غير مدعوم. يرجى اختيار ملفات PDF أو صور فقط`)
        return false
      }

      if (!isValidSize) {
        showError(`الملف ${file.name} كبير جداً. الحد الأقصى 10 ميجابايت`)
        return false
      }

      return true
    })

    setFiles((prev) => [...prev, ...validFiles])
  }

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (files.length === 0) {
      showError("يرجى اختيار ملف واحد على الأقل")
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file)
      })

      await api.post(`/orphan-files/${id}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      showSuccess("تم رفع الملفات بنجاح")
      navigate("/orphan-files")
    } catch (error) {
      showError(error.response?.data?.message || "حدث خطأ في رفع الملفات")
    } finally {
      setLoading(false)
    }
  }

  if (fetchingOrphan) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">رفع ملفات</h1>
        {orphan && (
          <p className="text-gray-600 mt-2">
            رفع ملفات لليتيم: <span className="font-medium">{orphan.name}</span>
          </p>
        )}
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اختيار الملفات</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">اسحب الملفات هنا أو انقر للاختيار</p>
              <p className="text-sm text-gray-500 mb-4">يدعم ملفات PDF والصور (الحد الأقصى 10 ميجابايت لكل ملف)</p>
              <input
                type="file"
                multiple
                accept=".pdf,image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="btn-primary cursor-pointer inline-block">
                اختيار الملفات
              </label>
            </div>
          </div>

          {files.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">الملفات المختارة ({files.length})</h3>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 ml-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} ميجابايت</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-4 space-x-reverse pt-4">
            <button
              type="submit"
              disabled={loading || files.length === 0}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "جاري الرفع..." : "رفع الملفات"}
            </button>
            <button type="button" onClick={() => navigate("/orphan-files")} className="btn-secondary flex-1">
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadFiles

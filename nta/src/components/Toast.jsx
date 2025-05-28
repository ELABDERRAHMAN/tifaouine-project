"use client"

import { useEffect } from "react"
import { CheckCircle, XCircle, Info, X } from "lucide-react"

const Toast = ({ message, type, onClose }) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  }

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }

  const Icon = icons[type]

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 space-x-reverse min-w-80`}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export default Toast

import React, { useState, useEffect } from 'react'
import './Toast.css'

interface ToastMessage {
  id: number
  message: string
  type: 'success' | 'error'
}

interface ToastProps {
  messages: ToastMessage[]
  onRemove: (id: number) => void
}

export const Toast: React.FC<ToastProps> = ({ messages, onRemove }) => {
  useEffect(() => {
    messages.forEach(toast => {
      const timer = setTimeout(() => {
        onRemove(toast.id)
      }, 3000)
      return () => clearTimeout(timer)
    })
  }, [messages, onRemove])

  return (
    <div className="toast-container">
      {messages.map(toast => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          onClick={() => onRemove(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
  }

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return { toasts, showToast, removeToast }
}

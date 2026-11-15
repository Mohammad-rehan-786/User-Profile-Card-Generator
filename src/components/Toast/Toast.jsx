import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import './Toast.css';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-live="polite">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration || 4000);

    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="toast-icon toast-icon-success" size={20} />;
      case 'error':
        return <AlertCircle className="toast-icon toast-icon-error" size={20} />;
      case 'warning':
        return <AlertTriangle className="toast-icon toast-icon-warning" size={20} />;
      case 'info':
      default:
        return <Info className="toast-icon toast-icon-info" size={20} />;
    }
  };

  return (
    <div className={`toast-item toast-${toast.type || 'info'} animate-slide-in`}>
      <div className="toast-content">
        {getIcon()}
        <div className="toast-text">
          {toast.title && <div className="toast-title">{toast.title}</div>}
          <div className="toast-message">{toast.message}</div>
        </div>
      </div>
      <button
        type="button"
        className="toast-close"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
      <div className="toast-progress" style={{ animationDuration: `${toast.duration || 4000}ms` }} />
    </div>
  );
}

import React from 'react';
import { ToastMessage, ToastVariant, useToast } from '../context/ToastContext';

const variantStyles: Record<ToastVariant, string> = {
  success: 'border-emerald-200 bg-white text-emerald-700',
  error: 'border-rose-200 bg-white text-rose-700',
  info: 'border-blue-200 bg-white text-blue-700',
};

const iconForVariant: Record<ToastVariant, React.ReactNode> = {
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.136 4.314-1.584-1.586a.75.75 0 1 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.144-.089l3.6-4.5Z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-1.25-5.75a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0Zm.25-7.25a.75.75 0 1 0-1.5 0v5a.75.75 0 1 0 1.5 0V5Z"
        clipRule="evenodd"
      />
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path d="M9 7a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z" />
      <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-.25-9.75a.75.75 0 0 1 1.5 0v4a.75.75 0 0 1-1.5 0v-4Z" />
    </svg>
  ),
};

const ToastCard: React.FC<{ toast: ToastMessage }> = ({ toast }) => {
  const { dismissToast } = useToast();
  return (
    <div
      className={`flex w-full max-w-sm items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg transition ${variantStyles[toast.variant]}`}
    >
      <div className="mt-1 text-lg">{iconForVariant[toast.variant]}</div>
      <div className="flex-1">
        <p className="text-sm font-semibold">{toast.title}</p>
        {toast.description && <p className="mt-1 text-sm text-slate-500">{toast.description}</p>}
      </div>
      <button
        type="button"
        onClick={() => dismissToast(toast.id)}
        className="mt-1 text-xs font-medium text-slate-400 transition hover:text-slate-600"
      >
        Close
      </button>
    </div>
  );
};

const ToastViewport: React.FC = () => {
  const { toasts } = useToast();

  if (!toasts.length) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-24 z-[100] flex flex-col items-center gap-3 px-4 sm:items-end sm:px-6">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastCard toast={toast} />
        </div>
      ))}
    </div>
  );
};

export default ToastViewport;

import React from 'react';

interface TrustBadgeProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ title, description, icon }) => (
  <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">
      {icon}
    </div>
    <div>
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p>{description}</p>
    </div>
  </div>
);

export default TrustBadge;

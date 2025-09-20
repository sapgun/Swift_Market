import React from 'react';

type StatusVariant = 'in-escrow' | 'shipped' | 'completed' | 'cancelled';

interface StatusBadgeProps {
  status: StatusVariant;
}

const statusConfig: Record<StatusVariant, { label: string; classes: string }> = {
  'in-escrow': {
    label: 'In Escrow',
    classes: 'bg-blue-50 text-blue-600',
  },
  shipped: {
    label: 'Shipped',
    classes: 'bg-amber-50 text-amber-600',
  },
  completed: {
    label: 'Completed',
    classes: 'bg-emerald-50 text-emerald-600',
  },
  cancelled: {
    label: 'Cancelled',
    classes: 'bg-rose-50 text-rose-600',
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const badge = statusConfig[status];

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${badge.classes}`}>
      {badge.label}
    </span>
  );
};

export default StatusBadge;

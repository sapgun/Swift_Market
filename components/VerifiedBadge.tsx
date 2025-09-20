
import React from 'react';

interface VerifiedBadgeProps {
  label?: string;
}

const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ label = 'Verified Seller' }) => {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-3.5 w-3.5"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          d="M10.339 1.155a.75.75 0 0 0-.678 0l-1.5.75-1.341-.447a.75.75 0 0 0-.872.372l-.633 1.266-1.397.21a.75.75 0 0 0-.617.868l.21 1.398-.991 1.091a.75.75 0 0 0 0 .99l.991 1.09-.21 1.399a.75.75 0 0 0 .617.868l1.398.21.633 1.266a.75.75 0 0 0 .872.372l1.341-.447 1.5.75a.75.75 0 0 0 .678 0l1.5-.75 1.341.447a.75.75 0 0 0 .872-.372l.633-1.266 1.398-.21a.75.75 0 0 0 .617-.868l-.21-1.398.991-1.091a.75.75 0 0 0 0-.99l-.991-1.09.21-1.399a.75.75 0 0 0-.617-.868l-1.398-.21-.633-1.266a.75.75 0 0 0-.872-.372l-1.341.447-1.5-.75Zm-1.536 5.79a.75.75 0 0 0-1.106 1.01l1.75 1.92a.75.75 0 0 0 1.097.03l3.25-3.25a.75.75 0 1 0-1.06-1.06l-2.717 2.717-1.214-1.367Z"
          clipRule="evenodd"
        />
      </svg>
      {label}
    </span>
  );
};

export default VerifiedBadge;

import React from 'react';

const levelStyles = {
  emergency: 'bg-error text-error-foreground',
  urgent: 'bg-warning text-warning-foreground',
  moderate: 'bg-info text-info-foreground',
  routine: 'bg-muted text-muted-foreground'
};

const levelLabels = {
  emergency: 'Emergency',
  urgent: 'Urgent',
  moderate: 'Moderate',
  routine: 'Routine'
};

const PriorityBadge = ({ level }) => {
  if (!level) return null;
  const lc = level.toLowerCase();
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${levelStyles[lc] || ''}`}
    >
      {levelLabels[lc] || level}
    </span>
  );
};

export default PriorityBadge;

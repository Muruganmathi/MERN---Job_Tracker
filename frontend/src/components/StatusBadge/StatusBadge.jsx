
import React from 'react';

const getBadgeClass = (status) => {
  switch (status) {
    case 'Applied':
      return 'bg-info text-dark'; 
    case 'Interview':
      return 'bg-primary'; 
    case 'Offer':
      return 'bg-success'; 
    case 'Rejected':
      return 'bg-danger'; 
    default:
      return 'bg-secondary';
  }
};

const StatusBadge = ({ status }) => {
  const badgeClass = getBadgeClass(status);
  
  return (
    <span className={`badge ${badgeClass} text-uppercase fw-bold`}>
      {status}
    </span>
  );
};

export default StatusBadge;
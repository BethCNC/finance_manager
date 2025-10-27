import React from 'react';
import {CheckCircle2, AlertCircle as AlertCircleIcon, XCircle} from 'lucide-react';

interface AlertCircleProps {
  type: 'success' | 'warning' | 'error';
  active: boolean;
  size?: number;
}

export const AlertCircle: React.FC<AlertCircleProps> = ({
  type,
  active,
  size = 16
}) => {
  const iconMap = {
    success: CheckCircle2,
    warning: AlertCircleIcon,
    error: XCircle
  };

  const activeColorMap = {
    success: 'text-success-solid',    // Semantic: success solid
    warning: 'text-warning-solid',    // Semantic: warning solid (orange)
    error: 'text-alert-solid'         // Semantic: alert solid
  };

  const Icon = iconMap[type];
  const colorClass = active ? activeColorMap[type] : 'text-gray-300';

  return (
    <Icon 
      size={size} 
      className={colorClass}
      strokeWidth={2}
    />
  );
};


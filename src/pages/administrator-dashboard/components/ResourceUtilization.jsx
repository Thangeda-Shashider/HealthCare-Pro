import React from 'react';
import Icon from '../../../components/AppIcon';

const ResourceUtilization = ({ resources }) => {
  const getUtilizationColor = (percentage) => {
    if (percentage >= 90) return 'var(--color-error)';
    if (percentage >= 70) return 'var(--color-warning)';
    return 'var(--color-success)';
  };

  const getStatusIcon = (percentage) => {
    if (percentage >= 90) return 'AlertCircle';
    if (percentage >= 70) return 'AlertTriangle';
    return 'CheckCircle';
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-2 border border-border">
      <div className="mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Resource Utilization</h3>
        <p className="text-sm text-muted-foreground">Real-time hospital resource monitoring</p>
      </div>
      <div className="space-y-4 md:space-y-6">
        {resources?.map((resource) => (
          <div key={resource?.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name={resource?.icon} size={20} color={getUtilizationColor(resource?.utilization)} />
                <div>
                  <p className="text-sm md:text-base font-medium text-foreground">{resource?.name}</p>
                  <p className="text-xs text-muted-foreground">{resource?.available} / {resource?.total} available</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icon name={getStatusIcon(resource?.utilization)} size={18} color={getUtilizationColor(resource?.utilization)} />
                <span className="text-sm md:text-base font-semibold data-text" style={{ color: getUtilizationColor(resource?.utilization) }}>
                  {resource?.utilization}%
                </span>
              </div>
            </div>
            
            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${resource?.utilization}%`,
                  backgroundColor: getUtilizationColor(resource?.utilization)
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceUtilization;
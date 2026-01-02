import React from 'react';
import Icon from '../../../components/AppIcon';

const HealthMetricsCard = ({ metrics }) => {
  const getMetricColor = (status) => {
    const colors = {
      'normal': 'text-success',
      'warning': 'text-warning',
      'critical': 'text-error'
    };
    return colors?.[status] || 'text-muted-foreground';
  };

  const getMetricIcon = (status) => {
    const icons = {
      'normal': 'CheckCircle',
      'warning': 'AlertTriangle',
      'critical': 'AlertCircle'
    };
    return icons?.[status] || 'Activity';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-elevation-2">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
          Health Metrics
        </h2>
        <button className="text-sm md:text-base text-primary hover:text-primary/80 font-medium transition-smooth">
          Update
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {metrics?.map((metric) => (
          <div
            key={metric?.id}
            className="border border-border rounded-lg p-3 md:p-4 hover:bg-muted/50 transition-smooth"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name={metric?.icon} size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">{metric?.label}</p>
                  <p className="text-lg md:text-xl lg:text-2xl font-bold text-foreground data-text">
                    {metric?.value}
                  </p>
                </div>
              </div>
              <Icon 
                name={getMetricIcon(metric?.status)} 
                size={20} 
                className={getMetricColor(metric?.status)} 
              />
            </div>
            <div className="flex items-center justify-between text-xs md:text-sm">
              <span className="text-muted-foreground">Last updated</span>
              <span className="text-foreground font-medium">{metric?.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthMetricsCard;
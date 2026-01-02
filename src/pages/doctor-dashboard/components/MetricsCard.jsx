import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, subtitle, icon, trend, trendValue }) => {
  const getTrendColor = () => {
    if (!trend) return 'text-muted-foreground';
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-5 lg:p-6 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2 font-caption uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground data-text">
            {value}
          </h3>
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon name={icon} size={24} color="var(--color-primary)" />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-xs md:text-sm text-muted-foreground truncate">{subtitle}</p>
        {trend && (
          <div className={`flex items-center gap-1 ${getTrendColor()}`}>
            <Icon name={getTrendIcon()} size={14} />
            <span className="text-xs md:text-sm font-medium whitespace-nowrap">{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;
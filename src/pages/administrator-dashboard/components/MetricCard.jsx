import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, iconColor, trend }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-2 hover:shadow-elevation-3 transition-smooth border border-border">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm md:text-base text-muted-foreground font-caption mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground data-text">{value}</h3>
        </div>
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${iconColor}15` }}>
          <Icon name={icon} size={24} color={iconColor} />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-1 ${getChangeColor()}`}>
          <Icon name={getChangeIcon()} size={16} />
          <span className="text-sm font-medium data-text">{change}</span>
        </div>
        <span className="text-sm text-muted-foreground">vs last month</span>
      </div>

      {trend && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${trend}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground data-text">{trend}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
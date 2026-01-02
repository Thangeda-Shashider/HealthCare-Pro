import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UrgentNotificationBanner = ({ notification, onDismiss, onViewDetails }) => {
  if (!notification) return null;

  const getPriorityStyles = (priority) => {
    const styles = {
      critical: 'bg-error/10 border-error',
      urgent: 'bg-warning/10 border-warning',
      high: 'bg-secondary/10 border-secondary'
    };
    return styles?.[priority] || styles?.urgent;
  };

  return (
    <div className={`border-l-4 rounded-lg p-4 md:p-5 ${getPriorityStyles(notification?.priority)}`}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-error/20 flex items-center justify-center flex-shrink-0">
          <Icon name="AlertCircle" size={20} color="var(--color-error)" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="text-sm md:text-base font-semibold text-foreground">
              {notification?.title}
            </h4>
            <button
              onClick={onDismiss}
              className="p-1 hover:bg-muted rounded transition-smooth flex-shrink-0"
              aria-label="Dismiss notification"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {notification?.message}
          </p>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="default"
              size="sm"
              iconName="Eye"
              iconPosition="left"
              onClick={onViewDetails}
            >
              View Details
            </Button>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span className="whitespace-nowrap">{notification?.time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrgentNotificationBanner;
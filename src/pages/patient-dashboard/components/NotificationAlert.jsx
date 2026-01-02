import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationAlert = ({ notification, onDismiss }) => {
  const getAlertStyle = (type) => {
    const styles = {
      'reminder': 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      'followup': 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      'urgent': 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
      'info': 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
    };
    return styles?.[type] || styles?.info;
  };

  const getIconName = (type) => {
    const icons = {
      'reminder': 'Bell',
      'followup': 'Calendar',
      'urgent': 'AlertCircle',
      'info': 'Info'
    };
    return icons?.[type] || 'Info';
  };

  const getIconColor = (type) => {
    const colors = {
      'reminder': '#3B82F6',
      'followup': '#10B981',
      'urgent': '#EF4444',
      'info': '#8B5CF6'
    };
    return colors?.[type] || '#8B5CF6';
  };

  return (
    <div className={`border rounded-xl p-4 md:p-5 ${getAlertStyle(notification?.type)} transition-smooth`}>
      <div className="flex items-start gap-3 md:gap-4">
        <div className="flex-shrink-0 mt-1">
          <Icon 
            name={getIconName(notification?.type)} 
            size={24} 
            color={getIconColor(notification?.type)} 
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">
            {notification?.title}
          </h3>
          <p className="text-sm md:text-base text-foreground/80 mb-3 md:mb-4">
            {notification?.message}
          </p>
          {notification?.action && (
            <Button
              variant="outline"
              size="sm"
              onClick={notification?.action?.onClick}
              className="mb-2"
            >
              {notification?.action?.label}
            </Button>
          )}
        </div>
        <button
          onClick={() => onDismiss(notification?.id)}
          className="flex-shrink-0 p-1 hover:bg-background/50 rounded-lg transition-smooth"
          aria-label="Dismiss notification"
        >
          <Icon name="X" size={20} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default NotificationAlert;
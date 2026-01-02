import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationCenter = ({ userRole = 'patient' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const panelRef = useRef(null);

  const mockNotifications = {
    patient: [
      {
        id: 1,
        type: 'appointment',
        title: 'Upcoming Appointment',
        message: 'Your appointment with Dr. Smith is tomorrow at 10:00 AM',
        time: '2 hours ago',
        read: false,
        icon: 'Calendar',
        color: 'primary'
      },
      {
        id: 2,
        type: 'prescription',
        title: 'Prescription Ready',
        message: 'Your prescription is ready for pickup at the pharmacy',
        time: '5 hours ago',
        read: false,
        icon: 'FileText',
        color: 'success'
      },
      {
        id: 3,
        type: 'result',
        title: 'Test Results Available',
        message: 'Your lab results from December 20 are now available',
        time: '1 day ago',
        read: true,
        icon: 'Activity',
        color: 'secondary'
      }
    ],
    doctor: [
      {
        id: 1,
        type: 'appointment',
        title: 'New Appointment Request',
        message: 'John Doe has requested an appointment for December 30',
        time: '30 minutes ago',
        read: false,
        icon: 'Calendar',
        color: 'primary'
      },
      {
        id: 2,
        type: 'urgent',
        title: 'Urgent Patient Alert',
        message: 'Patient Sarah Johnson requires immediate attention',
        time: '1 hour ago',
        read: false,
        icon: 'AlertCircle',
        color: 'error'
      },
      {
        id: 3,
        type: 'prescription',
        title: 'Prescription Approval',
        message: 'Prescription for Michael Brown has been approved',
        time: '3 hours ago',
        read: true,
        icon: 'CheckCircle',
        color: 'success'
      }
    ],
    administrator: [
      {
        id: 1,
        type: 'system',
        title: 'System Update',
        message: 'Scheduled maintenance on December 30 at 2:00 AM',
        time: '1 hour ago',
        read: false,
        icon: 'Settings',
        color: 'warning'
      },
      {
        id: 2,
        type: 'report',
        title: 'Monthly Report Ready',
        message: 'December analytics report is ready for review',
        time: '4 hours ago',
        read: false,
        icon: 'BarChart',
        color: 'secondary'
      },
      {
        id: 3,
        type: 'user',
        title: 'New User Registration',
        message: '5 new users registered today',
        time: '6 hours ago',
        read: true,
        icon: 'Users',
        color: 'primary'
      }
    ]
  };

  useEffect(() => {
    setNotifications(mockNotifications?.[userRole] || mockNotifications?.patient);
  }, [userRole]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef?.current && !panelRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  const handleNotificationClick = (notificationId) => {
    setNotifications(prev =>
      prev?.map(n =>
        n?.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const handleMarkAllRead = () => {
    setNotifications(prev =>
      prev?.map(n => ({ ...n, read: true }))
    );
  };

  const getIconColor = (color) => {
    const colorMap = {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      success: 'var(--color-success)',
      warning: 'var(--color-warning)',
      error: 'var(--color-error)'
    };
    return colorMap?.[color] || 'var(--color-foreground)';
  };

  return (
    <div className="notification-center" ref={panelRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="notification-center-trigger"
        aria-label="Open notifications"
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="notification-center-badge">{unreadCount}</span>
        )}
      </button>
      {isOpen && (
        <div className="notification-center-panel">
          <div className="notification-center-header">
            <h3 className="text-base font-semibold text-foreground font-heading">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllRead}
              >
                Mark all read
              </Button>
            )}
          </div>

          <div>
            {notifications?.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="Bell" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No notifications</p>
              </div>
            ) : (
              notifications?.map((notification) => (
                <div
                  key={notification?.id}
                  onClick={() => handleNotificationClick(notification?.id)}
                  className={`notification-center-item ${notification?.read ? '' : 'unread'}`}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <Icon
                        name={notification?.icon}
                        size={20}
                        color={getIconColor(notification?.color)}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-sm font-medium text-foreground">
                          {notification?.title}
                        </h4>
                        {!notification?.read && (
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification?.message}
                      </p>
                      <p className="text-xs text-muted-foreground font-caption">
                        {notification?.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
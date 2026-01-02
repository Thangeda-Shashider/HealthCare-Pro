import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarSyncStatus = ({ lastSync, isSyncing, onManualSync }) => {
  const getTimeSinceSync = () => {
    const now = new Date('2025-12-28T15:51:16');
    const syncTime = new Date(lastSync);
    const diffMinutes = Math.floor((now - syncTime) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-5 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon name="Calendar" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-sm md:text-base font-semibold text-foreground">Google Calendar</h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              {isSyncing ? 'Syncing...' : `Last synced ${getTimeSinceSync()}`}
            </p>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${isSyncing ? 'bg-warning animate-pulse' : 'bg-success'}`} />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Status</span>
          <span className="text-foreground font-medium">
            {isSyncing ? 'Syncing' : 'Connected'}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Auto-sync</span>
          <span className="text-success font-medium">Enabled</span>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        fullWidth
        iconName="RefreshCw"
        iconPosition="left"
        onClick={onManualSync}
        disabled={isSyncing}
        loading={isSyncing}
        className="mt-4"
      >
        {isSyncing ? 'Syncing...' : 'Manual Sync'}
      </Button>
    </div>
  );
};

export default CalendarSyncStatus;
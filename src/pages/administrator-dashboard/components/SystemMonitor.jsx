import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemMonitor = ({ systems }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'var(--color-success)';
      case 'warning': return 'var(--color-warning)';
      case 'critical': return 'var(--color-error)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'critical': return 'XCircle';
      default: return 'HelpCircle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'operational': return 'Operational';
      case 'warning': return 'Warning';
      case 'critical': return 'Critical';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-2 border border-border">
      <div className="mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">System Health Monitor</h3>
        <p className="text-sm text-muted-foreground">Real-time system performance and security status</p>
      </div>
      <div className="space-y-3 md:space-y-4">
        {systems?.map((system) => (
          <div key={system?.id} className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-muted/50 hover:bg-muted transition-smooth">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${getStatusColor(system?.status)}15` }}>
                <Icon name={system?.icon} size={20} color={getStatusColor(system?.status)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base font-medium text-foreground truncate">{system?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{system?.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-3">
              <Icon name={getStatusIcon(system?.status)} size={18} color={getStatusColor(system?.status)} />
              <span className="text-xs md:text-sm font-medium whitespace-nowrap" style={{ color: getStatusColor(system?.status) }}>
                {getStatusText(system?.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemMonitor;
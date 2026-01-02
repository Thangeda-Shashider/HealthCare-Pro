import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CriticalAlerts = ({ alerts }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'var(--color-error)';
      case 'high': return 'var(--color-warning)';
      case 'medium': return 'var(--color-secondary)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertOctagon';
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      default: return 'Info';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error/10';
      case 'high': return 'bg-warning/10';
      case 'medium': return 'bg-secondary/10';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-2 border border-border">
      <div className="mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Critical Alerts</h3>
        <p className="text-sm text-muted-foreground">System issues and operational bottlenecks requiring attention</p>
      </div>
      <div className="space-y-3 md:space-y-4">
        {alerts?.length === 0 ? (
          <div className="text-center py-8 md:py-12">
            <Icon name="CheckCircle" size={48} color="var(--color-success)" className="mx-auto mb-3" />
            <p className="text-sm md:text-base text-muted-foreground">No critical alerts at this time</p>
          </div>
        ) : (
          alerts?.map((alert) => (
            <div key={alert?.id} className={`p-3 md:p-4 rounded-lg border-l-4 ${getSeverityBg(alert?.severity)}`} style={{ borderLeftColor: getSeverityColor(alert?.severity) }}>
              <div className="flex items-start gap-3">
                <Icon name={getSeverityIcon(alert?.severity)} size={20} color={getSeverityColor(alert?.severity)} className="flex-shrink-0 mt-1" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm md:text-base font-semibold text-foreground">{alert?.title}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{alert?.time}</span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-3">{alert?.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
                      View Details
                    </Button>
                    <Button variant="default" size="sm" iconName="CheckCircle" iconPosition="left">
                      Resolve
                    </Button>
                    {alert?.severity === 'critical' && (
                      <Button variant="destructive" size="sm" iconName="AlertTriangle" iconPosition="left">
                        Escalate
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CriticalAlerts;
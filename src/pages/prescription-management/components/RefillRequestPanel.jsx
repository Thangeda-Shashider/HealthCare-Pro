import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RefillRequestPanel = ({ requests, onApprove, onDeny, userRole }) => {
  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'bg-error/10 text-error border-error/20',
      high: 'bg-warning/10 text-warning border-warning/20',
      normal: 'bg-primary/10 text-primary border-primary/20'
    };
    return colors?.[priority] || colors?.normal;
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-1 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Icon name="RefreshCw" size={20} color="var(--color-secondary)" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-foreground">Refill Requests</h3>
              <p className="text-xs md:text-sm text-muted-foreground font-caption">Pending approval</p>
            </div>
          </div>
          <span className="text-sm font-medium text-muted-foreground data-text">{requests?.length} pending</span>
        </div>
      </div>
      <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
        {requests?.length === 0 ? (
          <div className="p-8 md:p-12 text-center">
            <Icon name="CheckCircle" size={48} color="var(--color-success)" className="mx-auto mb-3" />
            <p className="text-sm md:text-base text-muted-foreground">No pending refill requests</p>
          </div>
        ) : (
          requests?.map((request) => (
            <div key={request?.id} className="p-4 md:p-6 hover:bg-muted/30 transition-smooth">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <Image
                    src={request?.patientImage}
                    alt={request?.patientImageAlt}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm md:text-base font-medium text-foreground mb-1">{request?.patientName}</h4>
                        <p className="text-xs md:text-sm text-muted-foreground font-caption">{request?.patientId}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-2 md:px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getPriorityColor(request?.priority)}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {request?.priority?.charAt(0)?.toUpperCase() + request?.priority?.slice(1)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-sm md:text-base font-medium text-foreground">{request?.medication}</p>
                        <p className="text-xs md:text-sm text-muted-foreground font-caption">{request?.dosage} - {request?.frequency}</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs md:text-sm">
                        <div>
                          <p className="text-muted-foreground font-caption">Requested</p>
                          <p className="text-foreground font-medium data-text">{request?.requestDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground font-caption">Last Refill</p>
                          <p className="text-foreground font-medium data-text">{request?.lastRefillDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground font-caption">Refills Left</p>
                          <p className="text-foreground font-medium data-text">{request?.refillsRemaining}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground font-caption">Quantity</p>
                          <p className="text-foreground font-medium data-text">{request?.quantity}</p>
                        </div>
                      </div>

                      {request?.notes && (
                        <div className="bg-muted/30 rounded-lg p-2 md:p-3">
                          <p className="text-xs md:text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">Patient Note:</span> {request?.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {userRole === 'doctor' && (
                  <div className="flex flex-row lg:flex-col gap-2 lg:w-32 flex-shrink-0">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onApprove(request)}
                      iconName="Check"
                      iconPosition="left"
                      iconSize={16}
                      fullWidth
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDeny(request)}
                      iconName="X"
                      iconPosition="left"
                      iconSize={16}
                      fullWidth
                    >
                      Deny
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RefillRequestPanel;
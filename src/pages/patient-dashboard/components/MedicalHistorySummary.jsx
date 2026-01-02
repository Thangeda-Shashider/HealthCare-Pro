import React from 'react';
import Icon from '../../../components/AppIcon';

const MedicalHistorySummary = ({ history }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'bg-success/10 text-success border-success/20',
      'Pending': 'bg-warning/10 text-warning border-warning/20',
      'Scheduled': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground border-border';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-elevation-2">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
          Medical History Summary
        </h2>
        <button className="text-sm md:text-base text-primary hover:text-primary/80 font-medium transition-smooth">
          View All
        </button>
      </div>
      <div className="space-y-3 md:space-y-4">
        {history?.map((item) => (
          <div
            key={item?.id}
            className="border border-border rounded-lg p-3 md:p-4 hover:bg-muted/50 transition-smooth"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={item?.icon} size={20} color="var(--color-primary)" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-semibold text-foreground mb-1">
                      {item?.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {item?.description}
                    </p>
                  </div>
                </div>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium border ${getStatusColor(item?.status)} whitespace-nowrap`}>
                {item?.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={14} />
                <span>{formatDate(item?.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="User" size={14} />
                <span>{item?.doctor}</span>
              </div>
              {item?.result && (
                <div className="flex items-center gap-2">
                  <Icon name="FileText" size={14} />
                  <span className="text-primary hover:underline cursor-pointer">
                    View Result
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalHistorySummary;
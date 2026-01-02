import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceTracker = ({ complianceData }) => {
  const getComplianceColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 70) return 'text-warning';
    return 'text-error';
  };

  const getComplianceStatus = (percentage) => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 70) return 'Good';
    if (percentage >= 50) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-1 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <Icon name="Activity" size={20} color="var(--color-success)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">Medication Compliance</h3>
            <p className="text-xs md:text-sm text-muted-foreground font-caption">Patient adherence tracking</p>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-6">
        {/* Overall Compliance */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-4 md:p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted-foreground font-caption mb-2">Overall Compliance Rate</p>
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl md:text-5xl font-bold data-text ${getComplianceColor(complianceData?.overallRate)}`}>
                  {complianceData?.overallRate}%
                </span>
                <span className={`text-base md:text-lg font-medium ${getComplianceColor(complianceData?.overallRate)}`}>
                  {getComplianceStatus(complianceData?.overallRate)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 md:gap-6">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground data-text">{complianceData?.dosesTaken}</p>
                <p className="text-xs md:text-sm text-muted-foreground font-caption">Doses Taken</p>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground data-text">{complianceData?.dosesScheduled}</p>
                <p className="text-xs md:text-sm text-muted-foreground font-caption">Scheduled</p>
              </div>
            </div>
          </div>
        </div>

        {/* Individual Medication Compliance */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground">Medication Breakdown</h4>
          
          {complianceData?.medications?.map((med, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm md:text-base font-medium text-foreground mb-1">{med?.name}</h5>
                  <p className="text-xs md:text-sm text-muted-foreground font-caption">{med?.dosage} - {med?.frequency}</p>
                </div>
                <span className={`text-lg md:text-xl font-bold data-text flex-shrink-0 ${getComplianceColor(med?.complianceRate)}`}>
                  {med?.complianceRate}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${
                    med?.complianceRate >= 90 ? 'bg-success' :
                    med?.complianceRate >= 70 ? 'bg-warning': 'bg-error'
                  }`}
                  style={{ width: `${med?.complianceRate}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 text-xs md:text-sm">
                <div>
                  <p className="text-muted-foreground font-caption">Taken</p>
                  <p className="text-foreground font-medium data-text">{med?.taken}</p>
                </div>
                <div>
                  <p className="text-muted-foreground font-caption">Missed</p>
                  <p className="text-error font-medium data-text">{med?.missed}</p>
                </div>
                <div>
                  <p className="text-muted-foreground font-caption">Last Dose</p>
                  <p className="text-foreground font-medium data-text">{med?.lastDose}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Insights */}
        <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="Lightbulb" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground mb-2">Compliance Insights</p>
              <ul className="space-y-1 text-xs md:text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Most missed doses occur on weekends</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Evening medications have lower compliance rate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Consider setting up medication reminders</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceTracker;
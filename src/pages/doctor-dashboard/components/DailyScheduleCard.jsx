import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DailyScheduleCard = ({ appointment, onViewRecord, onCreatePrescription, onStartConsultation }) => {
  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'in-progress': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    };
    return colors?.[status] || colors?.scheduled;
  };

  const getTypeIcon = (type) => {
    const icons = {
      consultation: 'Stethoscope',
      'follow-up': 'RefreshCw',
      emergency: 'AlertCircle',
      checkup: 'ClipboardCheck'
    };
    return icons?.[type] || 'Calendar';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-5 lg:p-6 hover:shadow-elevation-2 transition-smooth">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon name={getTypeIcon(appointment?.type)} size={20} color="var(--color-primary)" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-semibold text-foreground truncate">
              {appointment?.patientName}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              {appointment?.time} • {appointment?.duration}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap ${getStatusColor(appointment?.status)}`}>
          {appointment?.status?.replace('-', ' ')}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="User" size={16} />
          <span className="truncate">Age: {appointment?.age} • {appointment?.gender}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="FileText" size={16} />
          <span className="truncate capitalize">{appointment?.type}</span>
        </div>
      </div>
      {appointment?.reason && (
        <div className="bg-muted rounded-lg p-3 mb-4">
          <p className="text-sm text-foreground line-clamp-2">{appointment?.reason}</p>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          iconName="FolderOpen"
          iconPosition="left"
          onClick={() => onViewRecord(appointment?.id)}
          className="flex-1 md:flex-initial"
        >
          View Record
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="FileText"
          iconPosition="left"
          onClick={() => onCreatePrescription(appointment?.id)}
          className="flex-1 md:flex-initial"
        >
          Prescription
        </Button>
        <Button
          variant="default"
          size="sm"
          iconName="Video"
          iconPosition="left"
          onClick={() => onStartConsultation(appointment?.id)}
          className="flex-1 md:flex-initial"
        >
          Start Call
        </Button>
      </div>
    </div>
  );
};

export default DailyScheduleCard;
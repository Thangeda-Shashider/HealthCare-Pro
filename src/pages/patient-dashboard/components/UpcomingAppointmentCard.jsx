import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UpcomingAppointmentCard = ({ appointment, onReschedule, onCancel }) => {
  const getAppointmentTypeColor = (type) => {
    const colors = {
      'Consultation': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      'Follow-up': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      'Check-up': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      'Emergency': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
    };
    return colors?.[type] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString?.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-elevation-2 hover:shadow-elevation-3 transition-smooth">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl overflow-hidden bg-muted">
            <Image
              src={appointment?.doctorImage}
              alt={appointment?.doctorImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3 md:mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-1 md:mb-2">
                {appointment?.doctorName}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-2">
                {appointment?.specialty}
              </p>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs md:text-sm font-medium ${getAppointmentTypeColor(appointment?.type)}`}>
                <Icon name="Stethoscope" size={14} />
                {appointment?.type}
              </span>
            </div>
          </div>

          <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
            <div className="flex items-center gap-3 text-sm md:text-base">
              <Icon name="Calendar" size={18} color="var(--color-primary)" />
              <span className="text-foreground font-medium">{formatDate(appointment?.date)}</span>
            </div>
            <div className="flex items-center gap-3 text-sm md:text-base">
              <Icon name="Clock" size={18} color="var(--color-primary)" />
              <span className="text-foreground font-medium">{formatTime(appointment?.time)}</span>
            </div>
            <div className="flex items-center gap-3 text-sm md:text-base">
              <Icon name="MapPin" size={18} color="var(--color-primary)" />
              <span className="text-foreground">{appointment?.location}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              size="default"
              iconName="Calendar"
              iconPosition="left"
              onClick={() => onReschedule(appointment?.id)}
              className="flex-1 sm:flex-initial"
            >
              Reschedule
            </Button>
            <Button
              variant="destructive"
              size="default"
              iconName="X"
              iconPosition="left"
              onClick={() => onCancel(appointment?.id)}
              className="flex-1 sm:flex-initial"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingAppointmentCard;
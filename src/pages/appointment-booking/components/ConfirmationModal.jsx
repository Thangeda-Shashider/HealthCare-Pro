import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfirmationModal = ({ isOpen, onClose, appointmentDetails }) => {
  if (!isOpen) return null;

  const handleAddToCalendar = () => {
    alert('Calendar integration would sync with Google Calendar API');
  };

  const handleDownloadReceipt = () => {
    alert('Receipt download functionality');
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-xl shadow-elevation-4 w-full max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 md:p-8">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-success/20 flex items-center justify-center mb-4">
              <Icon name="CheckCircle" size={40} color="var(--color-success)" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2 font-heading">
              Appointment Confirmed!
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Your appointment has been successfully scheduled
            </p>
          </div>

          <div className="bg-muted rounded-lg p-4 md:p-6 mb-6 space-y-4">
            <div className="flex items-start gap-3">
              <Icon name="User" size={20} color="var(--color-primary)" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Doctor</p>
                <p className="text-sm md:text-base font-semibold text-foreground">
                  {appointmentDetails?.doctor}
                </p>
                <p className="text-xs text-muted-foreground">{appointmentDetails?.specialty}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Icon name="Calendar" size={20} color="var(--color-primary)" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Date & Time</p>
                <p className="text-sm md:text-base font-semibold text-foreground">
                  {appointmentDetails?.date}
                </p>
                <p className="text-xs text-muted-foreground">{appointmentDetails?.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Icon name="MapPin" size={20} color="var(--color-primary)" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Location</p>
                <p className="text-sm md:text-base font-semibold text-foreground">
                  {appointmentDetails?.location}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Icon name="FileText" size={20} color="var(--color-primary)" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Appointment Type</p>
                <p className="text-sm md:text-base font-semibold text-foreground">
                  {appointmentDetails?.type}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Icon name="DollarSign" size={20} color="var(--color-primary)" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Consultation Fee</p>
                <p className="text-sm md:text-base font-semibold text-foreground">
                  ${appointmentDetails?.fee}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} color="var(--color-primary)" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground mb-2">Preparation Instructions</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5" />
                    <span>Arrive 10 minutes before your appointment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5" />
                    <span>Bring your ID and insurance card</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5" />
                    <span>List all current medications</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="default"
              fullWidth
              onClick={handleAddToCalendar}
              iconName="Calendar"
              iconPosition="left"
            >
              Add to Google Calendar
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={handleDownloadReceipt}
              iconName="Download"
              iconPosition="left"
            >
              Download Receipt
            </Button>
            <Button
              variant="ghost"
              fullWidth
              onClick={onClose}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
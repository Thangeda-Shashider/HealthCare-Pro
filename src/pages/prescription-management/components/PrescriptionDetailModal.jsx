import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PrescriptionDetailModal = ({ isOpen, onClose, prescription, onPrint, onSendToPharmacy }) => {
  if (!isOpen || !prescription) return null;

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-success/10 text-success border-success/20',
      expiring: 'bg-warning/10 text-warning border-warning/20',
      expired: 'bg-error/10 text-error border-error/20',
      pending: 'bg-secondary/10 text-secondary border-secondary/20'
    };
    return colors?.[status] || colors?.active;
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-xl border border-border shadow-elevation-4 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Prescription Details</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Patient Information */}
          <div className="bg-muted/30 rounded-lg p-4 md:p-6">
            <div className="flex items-start gap-4">
              <Image
                src={prescription?.patientImage}
                alt={prescription?.patientImageAlt}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground mb-1">{prescription?.patientName}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground font-caption">Patient ID</p>
                    <p className="text-foreground font-medium data-text">{prescription?.patientId}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-caption">Age</p>
                    <p className="text-foreground font-medium">{prescription?.patientAge} years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prescription Status */}
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(prescription?.status)}`}>
              <span className="w-2 h-2 rounded-full bg-current"></span>
              {prescription?.status?.charAt(0)?.toUpperCase() + prescription?.status?.slice(1)}
            </span>
            <p className="text-sm text-muted-foreground font-caption">
              Prescription #{prescription?.prescriptionNumber}
            </p>
          </div>

          {/* Medication Details */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">Medication Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground font-caption mb-1">Brand Name</p>
                <p className="text-sm font-medium text-foreground">{prescription?.medication}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground font-caption mb-1">Generic Name</p>
                <p className="text-sm font-medium text-foreground">{prescription?.genericName}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground font-caption mb-1">Dosage</p>
                <p className="text-sm font-medium text-foreground data-text">{prescription?.dosage}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground font-caption mb-1">Frequency</p>
                <p className="text-sm font-medium text-foreground">{prescription?.frequency}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground font-caption mb-1">Duration</p>
                <p className="text-sm font-medium text-foreground">{prescription?.duration}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground font-caption mb-1">Quantity</p>
                <p className="text-sm font-medium text-foreground data-text">{prescription?.quantity}</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          {prescription?.instructions && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground mb-1">Patient Instructions</p>
                  <p className="text-sm text-muted-foreground">{prescription?.instructions}</p>
                </div>
              </div>
            </div>
          )}

          {/* Refill Information */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">Refill Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground font-caption mb-1">Refills Remaining</p>
                <p className="text-2xl font-semibold text-foreground data-text">{prescription?.refillsRemaining}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground font-caption mb-1">Total Refills</p>
                <p className="text-2xl font-semibold text-foreground data-text">{prescription?.totalRefills}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground font-caption mb-1">Last Refill</p>
                <p className="text-sm font-medium text-foreground data-text">{prescription?.lastRefillDate}</p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
              <Icon name="Calendar" size={20} color="var(--color-primary)" />
              <div>
                <p className="text-xs text-muted-foreground font-caption">Prescribed Date</p>
                <p className="text-sm font-medium text-foreground data-text">{prescription?.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
              <Icon name="CalendarX" size={20} color="var(--color-warning)" />
              <div>
                <p className="text-xs text-muted-foreground font-caption">Expiry Date</p>
                <p className="text-sm font-medium text-foreground data-text">{prescription?.expiryDate}</p>
              </div>
            </div>
          </div>

          {/* Prescriber Information */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Prescriber Information</h3>
            <div className="flex items-center gap-3">
              <Image
                src={prescription?.doctorImage}
                alt={prescription?.doctorImageAlt}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-foreground">{prescription?.doctorName}</p>
                <p className="text-xs text-muted-foreground font-caption">{prescription?.doctorSpecialty}</p>
                <p className="text-xs text-muted-foreground font-caption">License: {prescription?.doctorLicense}</p>
              </div>
            </div>
          </div>

          {/* Pharmacy Information */}
          {prescription?.pharmacy && (
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Pharmacy Information</h3>
              <div className="space-y-2 text-sm">
                <p className="text-foreground font-medium">{prescription?.pharmacy}</p>
                <p className="text-muted-foreground">{prescription?.pharmacyAddress}</p>
                <p className="text-muted-foreground font-caption">Phone: {prescription?.pharmacyPhone}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onPrint}
            iconName="Printer"
            iconPosition="left"
            fullWidth
            className="sm:flex-1"
          >
            Print
          </Button>
          <Button
            variant="outline"
            onClick={() => onSendToPharmacy(prescription)}
            iconName="Send"
            iconPosition="left"
            fullWidth
            className="sm:flex-1"
          >
            Send to Pharmacy
          </Button>
          <Button
            onClick={onClose}
            fullWidth
            className="sm:flex-1"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetailModal;
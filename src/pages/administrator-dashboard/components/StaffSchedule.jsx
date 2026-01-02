import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const StaffSchedule = ({ staff }) => {
  const getLoadColor = (load) => {
    if (load >= 90) return 'var(--color-error)';
    if (load >= 70) return 'var(--color-warning)';
    return 'var(--color-success)';
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-2 border border-border">
      <div className="mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Staff Schedule & Load</h3>
        <p className="text-sm text-muted-foreground">Current doctor schedules and patient loads</p>
      </div>
      <div className="space-y-3 md:space-y-4">
        {staff?.map((doctor) => (
          <div key={doctor?.id} className="p-3 md:p-4 rounded-lg border border-border hover:shadow-elevation-2 transition-smooth">
            <div className="flex items-start gap-3 md:gap-4 mb-3">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0">
                <Image 
                  src={doctor?.avatar} 
                  alt={doctor?.avatarAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm md:text-base font-semibold text-foreground truncate">{doctor?.name}</h4>
                <p className="text-xs md:text-sm text-muted-foreground truncate">{doctor?.specialization}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
                  <span className="text-xs text-muted-foreground">{doctor?.schedule}</span>
                </div>
              </div>
              <div className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                doctor?.status === 'available' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
              }`}>
                {doctor?.status === 'available' ? 'Available' : 'Busy'}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs md:text-sm">
                <span className="text-muted-foreground">Patient Load</span>
                <span className="font-semibold data-text" style={{ color: getLoadColor(doctor?.patientLoad) }}>
                  {doctor?.currentPatients} / {doctor?.maxPatients}
                </span>
              </div>
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${doctor?.patientLoad}%`,
                    backgroundColor: getLoadColor(doctor?.patientLoad)
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffSchedule;
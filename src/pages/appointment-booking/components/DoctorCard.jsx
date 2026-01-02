import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DoctorCard = ({ doctor, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(doctor)}
      className={`
        bg-card rounded-xl shadow-elevation-2 p-4 md:p-6 cursor-pointer transition-smooth
        ${isSelected ? 'ring-2 ring-primary shadow-elevation-3' : 'hover:shadow-elevation-3'}
      `}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden">
            <Image
              src={doctor?.image}
              alt={doctor?.imageAlt}
              className="w-full h-full object-cover"
            />
            {doctor?.available && (
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-success rounded-full border-2 border-card"></div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
            <div>
              <h3 className="text-base md:text-lg font-semibold text-foreground font-heading">
                {doctor?.name}
              </h3>
              <p className="text-sm text-muted-foreground">{doctor?.specialty}</p>
            </div>
            <div className="flex items-center gap-1 justify-center md:justify-start">
              <Icon name="Star" size={16} color="var(--color-warning)" />
              <span className="text-sm font-medium text-foreground">{doctor?.rating}</span>
              <span className="text-xs text-muted-foreground">({doctor?.reviews})</span>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
              <Icon name="Briefcase" size={16} />
              <span>{doctor?.experience} years experience</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
              <Icon name="MapPin" size={16} />
              <span>{doctor?.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
              <Icon name="DollarSign" size={16} />
              <span>Consultation: ${doctor?.consultationFee}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
            {doctor?.languages?.map((lang) => (
              <span
                key={lang}
                className="px-2 py-1 bg-muted text-xs font-medium text-foreground rounded-md"
              >
                {lang}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm justify-center md:justify-start">
            <Icon
              name={doctor?.available ? 'CheckCircle' : 'Clock'}
              size={16}
              color={doctor?.available ? 'var(--color-success)' : 'var(--color-warning)'}
            />
            <span className={doctor?.available ? 'text-success' : 'text-warning'}>
              {doctor?.available ? 'Available Today' : doctor?.nextAvailable}
            </span>
          </div>
        </div>
      </div>
      {isSelected && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="default" fullWidth iconName="Calendar" iconPosition="left">
            Continue with Dr. {doctor?.name?.split(' ')?.[1]}
          </Button>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
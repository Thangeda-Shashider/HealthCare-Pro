import React from 'react';
import Icon from '../../../components/AppIcon';

const SpecialtySelector = ({ specialties, selectedSpecialty, onSelect }) => {
  return (
    <div className="bg-card rounded-xl shadow-elevation-2 p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6 font-heading">
        Select Specialty
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {specialties?.map((specialty) => (
          <button
            key={specialty?.id}
            onClick={() => onSelect(specialty)}
            className={`
              p-4 md:p-6 rounded-xl transition-smooth text-center
              ${selectedSpecialty?.id === specialty?.id
                ? 'bg-primary text-primary-foreground shadow-elevation-3'
                : 'bg-muted hover:bg-muted/80 hover:shadow-elevation-2'
              }
            `}
          >
            <div className="flex flex-col items-center gap-2 md:gap-3">
              <div className={`
                w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center
                ${selectedSpecialty?.id === specialty?.id ? 'bg-primary-foreground/20' : 'bg-background'}
              `}>
                <Icon
                  name={specialty?.icon}
                  size={24}
                  color={selectedSpecialty?.id === specialty?.id ? 'var(--color-primary-foreground)' : 'var(--color-primary)'}
                />
              </div>
              <div>
                <p className="text-sm md:text-base font-semibold mb-1">{specialty?.name}</p>
                <p className={`text-xs ${selectedSpecialty?.id === specialty?.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {specialty?.doctorCount} doctors
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpecialtySelector;
import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickActionCard = ({ title, description, icon, iconColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-elevation-1 hover:shadow-elevation-3 transition-smooth text-left w-full group"
    >
      <div className="flex items-start gap-4">
        <div 
          className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center flex-shrink-0 transition-smooth group-hover:scale-110"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon name={icon} size={28} color={iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground mb-1 md:mb-2">
            {title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
        <Icon 
          name="ChevronRight" 
          size={20} 
          className="text-muted-foreground group-hover:text-primary transition-smooth flex-shrink-0 mt-1" 
        />
      </div>
    </button>
  );
};

export default QuickActionCard;
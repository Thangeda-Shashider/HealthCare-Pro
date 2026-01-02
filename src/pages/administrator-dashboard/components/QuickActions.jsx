import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ actions }) => {
  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-2 border border-border">
      <div className="mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Quick Actions</h3>
        <p className="text-sm text-muted-foreground">Frequently used administrative functions</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {actions?.map((action) => (
          <button
            key={action?.id}
            className="p-4 rounded-lg border border-border hover:border-primary hover:shadow-elevation-2 transition-smooth text-left group"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-smooth" style={{ backgroundColor: `${action?.color}15` }}>
                <Icon name={action?.icon} size={20} color={action?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm md:text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-smooth">
                  {action?.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{action?.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PendingTaskItem = ({ task, onComplete }) => {
  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'bg-error/10 border-error text-error',
      high: 'bg-warning/10 border-warning text-warning',
      medium: 'bg-secondary/10 border-secondary text-secondary',
      low: 'bg-muted border-border text-muted-foreground'
    };
    return colors?.[priority] || colors?.medium;
  };

  const getTaskIcon = (type) => {
    const icons = {
      prescription: 'FileText',
      report: 'ClipboardCheck',
      followup: 'Phone',
      review: 'Eye'
    };
    return icons?.[type] || 'CheckCircle';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-3 md:p-4 hover:shadow-elevation-1 transition-smooth">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon name={getTaskIcon(task?.type)} size={18} color="var(--color-primary)" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="text-sm md:text-base font-medium text-foreground line-clamp-1">
              {task?.title}
            </h4>
            <span className={`px-2 py-1 rounded-md text-xs font-medium border whitespace-nowrap ${getPriorityColor(task?.priority)}`}>
              {task?.priority}
            </span>
          </div>
          
          <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2">
            {task?.description}
          </p>
          
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span className="whitespace-nowrap">{task?.dueTime}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="Check"
              iconPosition="left"
              onClick={() => onComplete(task?.id)}
            >
              Complete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingTaskItem;
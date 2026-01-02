import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MedicationHistoryPanel = ({ history, onViewDetails }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpand = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded?.has(id)) {
      newExpanded?.delete(id);
    } else {
      newExpanded?.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getEffectivenessColor = (rating) => {
    if (rating >= 4) return 'text-success';
    if (rating >= 3) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-1 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="History" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-foreground">Medication History</h3>
              <p className="text-xs md:text-sm text-muted-foreground font-caption">Complete treatment timeline</p>
            </div>
          </div>
          <span className="text-sm font-medium text-muted-foreground data-text">{history?.length} records</span>
        </div>
      </div>
      <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
        {history?.map((item) => (
          <div key={item?.id} className="p-4 md:p-6 hover:bg-muted/30 transition-smooth">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm md:text-base font-medium text-foreground mb-1">{item?.medication}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground font-caption">{item?.genericName}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item?.status === 'completed' ? 'bg-success/10 text-success' :
                    item?.status === 'discontinued'? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                  }`}>
                    {item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-xs md:text-sm">
                  <div>
                    <p className="text-muted-foreground font-caption">Dosage</p>
                    <p className="text-foreground font-medium data-text">{item?.dosage}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-caption">Duration</p>
                    <p className="text-foreground font-medium">{item?.duration}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-caption">Start Date</p>
                    <p className="text-foreground font-medium data-text">{item?.startDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-caption">End Date</p>
                    <p className="text-foreground font-medium data-text">{item?.endDate}</p>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleExpand(item?.id)}
                iconName={expandedItems?.has(item?.id) ? 'ChevronUp' : 'ChevronDown'}
                iconSize={20}
              />
            </div>

            {expandedItems?.has(item?.id) && (
              <div className="mt-4 pt-4 border-t border-border space-y-4">
                {/* Effectiveness Rating */}
                <div className="bg-muted/30 rounded-lg p-3 md:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs md:text-sm font-medium text-foreground">Effectiveness Rating</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5]?.map((star) => (
                        <Icon
                          key={star}
                          name={star <= item?.effectivenessRating ? 'Star' : 'Star'}
                          size={16}
                          color={star <= item?.effectivenessRating ? 'var(--color-warning)' : 'var(--color-muted-foreground)'}
                          className={star <= item?.effectivenessRating ? 'fill-current' : ''}
                        />
                      ))}
                      <span className={`ml-2 text-sm font-semibold data-text ${getEffectivenessColor(item?.effectivenessRating)}`}>
                        {item?.effectivenessRating}/5
                      </span>
                    </div>
                  </div>
                  {item?.effectivenessNotes && (
                    <p className="text-xs md:text-sm text-muted-foreground">{item?.effectivenessNotes}</p>
                  )}
                </div>

                {/* Side Effects */}
                {item?.sideEffects && item?.sideEffects?.length > 0 && (
                  <div className="bg-warning/5 border border-warning/20 rounded-lg p-3 md:p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <Icon name="AlertCircle" size={16} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
                      <p className="text-xs md:text-sm font-medium text-foreground">Reported Side Effects</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item?.sideEffects?.map((effect, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-warning/10 text-warning rounded-full">
                          {effect}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prescriber */}
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <div>
                    <p className="text-muted-foreground font-caption">Prescribed by</p>
                    <p className="text-foreground font-medium">{item?.prescribedBy}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(item)}
                    iconName="Eye"
                    iconPosition="left"
                    iconSize={16}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationHistoryPanel;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DrugInteractionChecker = ({ patientMedications, patientAllergies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [interactions, setInteractions] = useState([]);
  const [isChecking, setIsChecking] = useState(false);

  const interactionDatabase = [
    {
      drug1: 'Warfarin',
      drug2: 'Aspirin',
      severity: 'high',
      description: 'Increased risk of bleeding. Monitor INR levels closely and adjust dosage as needed.',
      recommendation: 'Consider alternative antiplatelet therapy or reduce aspirin dosage'
    },
    {
      drug1: 'Metformin',
      drug2: 'Alcohol',
      severity: 'medium',
      description: 'Increased risk of lactic acidosis. Avoid excessive alcohol consumption.',
      recommendation: 'Advise patient to limit alcohol intake'
    },
    {
      drug1: 'Lisinopril',
      drug2: 'Potassium Supplements',
      severity: 'high',
      description: 'Risk of hyperkalemia. Monitor potassium levels regularly.',
      recommendation: 'Avoid potassium supplements unless specifically prescribed'
    },
    {
      drug1: 'Atorvastatin',
      drug2: 'Grapefruit Juice',
      severity: 'medium',
      description: 'Grapefruit juice increases statin levels, raising risk of side effects.',
      recommendation: 'Advise patient to avoid grapefruit products'
    }
  ];

  const handleCheck = () => {
    setIsChecking(true);
    
    setTimeout(() => {
      const foundInteractions = [];
      
      patientMedications?.forEach(med1 => {
        patientMedications?.forEach(med2 => {
          if (med1 !== med2) {
            const interaction = interactionDatabase?.find(
              int => (int?.drug1 === med1 && int?.drug2 === med2) || 
                     (int?.drug1 === med2 && int?.drug2 === med1)
            );
            if (interaction && !foundInteractions?.some(i => i?.drug1 === interaction?.drug1 && i?.drug2 === interaction?.drug2)) {
              foundInteractions?.push(interaction);
            }
          }
        });
      });

      if (searchTerm) {
        const newDrugInteractions = interactionDatabase?.filter(
          int => int?.drug1?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                 int?.drug2?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );
        newDrugInteractions?.forEach(interaction => {
          if (!foundInteractions?.some(i => i?.drug1 === interaction?.drug1 && i?.drug2 === interaction?.drug2)) {
            foundInteractions?.push(interaction);
          }
        });
      }

      patientAllergies?.forEach(allergy => {
        if (searchTerm?.toLowerCase()?.includes(allergy?.toLowerCase())) {
          foundInteractions?.push({
            drug1: searchTerm,
            drug2: 'Patient Allergy',
            severity: 'high',
            description: `Patient has documented allergy to ${allergy}. This medication may cause allergic reaction.`,
            recommendation: 'Do not prescribe. Consider alternative medication.'
          });
        }
      });

      setInteractions(foundInteractions);
      setIsChecking(false);
    }, 1000);
  };

  const getSeverityColor = (severity) => {
    const colors = {
      high: 'bg-error/10 text-error border-error/20',
      medium: 'bg-warning/10 text-warning border-warning/20',
      low: 'bg-secondary/10 text-secondary border-secondary/20'
    };
    return colors?.[severity] || colors?.low;
  };

  const getSeverityIcon = (severity) => {
    const icons = {
      high: 'AlertTriangle',
      medium: 'AlertCircle',
      low: 'Info'
    };
    return icons?.[severity] || icons?.low;
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-1 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">Drug Interaction Checker</h3>
            <p className="text-xs md:text-sm text-muted-foreground font-caption">Check for potential interactions</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            placeholder="Enter medication name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="flex-1"
          />
          <Button
            onClick={handleCheck}
            loading={isChecking}
            iconName="Search"
            iconPosition="left"
            className="sm:w-auto"
          >
            Check Interactions
          </Button>
        </div>
      </div>
      {/* Current Medications */}
      <div className="p-4 md:p-6 border-b border-border">
        <h4 className="text-sm font-semibold text-foreground mb-3">Current Medications</h4>
        <div className="flex flex-wrap gap-2">
          {patientMedications?.map((med, index) => (
            <span key={index} className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-medium">
              <Icon name="Pill" size={14} />
              {med}
            </span>
          ))}
        </div>
      </div>
      {/* Allergies */}
      {patientAllergies?.length > 0 && (
        <div className="p-4 md:p-6 border-b border-border bg-error/5">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Icon name="AlertCircle" size={16} color="var(--color-error)" />
            Known Allergies
          </h4>
          <div className="flex flex-wrap gap-2">
            {patientAllergies?.map((allergy, index) => (
              <span key={index} className="inline-flex items-center gap-2 px-3 py-1.5 bg-error/10 text-error rounded-full text-xs md:text-sm font-medium border border-error/20">
                <Icon name="AlertTriangle" size={14} />
                {allergy}
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Interaction Results */}
      <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
        {interactions?.length === 0 && !isChecking && (
          <div className="p-8 md:p-12 text-center">
            <Icon name="CheckCircle" size={48} color="var(--color-success)" className="mx-auto mb-3" />
            <p className="text-sm md:text-base text-muted-foreground">
              {searchTerm ? 'No interactions found' : 'Enter a medication to check for interactions'}
            </p>
          </div>
        )}

        {interactions?.map((interaction, index) => (
          <div key={index} className="p-4 md:p-6">
            <div className="flex items-start gap-3 md:gap-4">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getSeverityColor(interaction?.severity)}`}>
                <Icon name={getSeverityIcon(interaction?.severity)} size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="text-sm md:text-base font-semibold text-foreground">
                    {interaction?.drug1} + {interaction?.drug2}
                  </h4>
                  <span className={`inline-flex items-center gap-1.5 px-2 md:px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getSeverityColor(interaction?.severity)}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {interaction?.severity?.charAt(0)?.toUpperCase() + interaction?.severity?.slice(1)} Risk
                  </span>
                </div>

                <p className="text-xs md:text-sm text-muted-foreground mb-3">{interaction?.description}</p>

                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs font-medium text-foreground mb-1">Recommendation:</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{interaction?.recommendation}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrugInteractionChecker;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BookingForm = ({ onSubmit, selectedDoctor, selectedDate, selectedSlot }) => {
  const [formData, setFormData] = useState({
    appointmentType: '',
    symptoms: '',
    urgencyLevel: '',
    additionalNotes: ''
  });

  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [errors, setErrors] = useState({});

  const appointmentTypes = [
    { value: 'consultation', label: 'General Consultation' },
    { value: 'followup', label: 'Follow-up Visit' },
    { value: 'checkup', label: 'Routine Check-up' },
    { value: 'emergency', label: 'Emergency Consultation' }
  ];

  const urgencyLevels = [
    { value: 'routine', label: 'Routine - Can wait a few days' },
    { value: 'moderate', label: 'Moderate - Within 1-2 days' },
    { value: 'urgent', label: 'Urgent - Same day preferred' },
    { value: 'emergency', label: 'Emergency - Immediate attention' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    if (field === 'symptoms' && value?.length > 20) {
      setTimeout(() => {
        setAiAnalysis({
          recommendation: 'Based on your symptoms, a general consultation is recommended',
          estimatedWaitTime: '15-20 minutes',
          preparationTips: [
            'Bring any previous medical records',
            'List all current medications',
            'Note when symptoms started'
          ]
        });
      }, 1000);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData?.appointmentType) newErrors.appointmentType = 'Please select appointment type';
    if (!formData?.symptoms?.trim()) newErrors.symptoms = 'Please describe your symptoms';
    if (!formData?.urgencyLevel) newErrors.urgencyLevel = 'Please select urgency level';
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-elevation-2 p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6 font-heading">
        Appointment Details
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <Select
          label="Appointment Type"
          required
          options={appointmentTypes}
          value={formData?.appointmentType}
          onChange={(value) => handleChange('appointmentType', value)}
          error={errors?.appointmentType}
          placeholder="Select appointment type"
        />

        <Input
          label="Describe Your Symptoms"
          type="text"
          required
          value={formData?.symptoms}
          onChange={(e) => handleChange('symptoms', e?.target?.value)}
          error={errors?.symptoms}
          placeholder="E.g., Persistent headache for 3 days"
          description="Be as specific as possible for better AI analysis"
        />

        <Select
          label="Urgency Level"
          required
          options={urgencyLevels}
          value={formData?.urgencyLevel}
          onChange={(value) => handleChange('urgencyLevel', value)}
          error={errors?.urgencyLevel}
          placeholder="Select urgency level"
        />

        <Input
          label="Additional Notes (Optional)"
          type="text"
          value={formData?.additionalNotes}
          onChange={(e) => handleChange('additionalNotes', e?.target?.value)}
          placeholder="Any other information you'd like to share"
        />

        {aiAnalysis && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <Icon name="Sparkles" size={20} color="var(--color-primary)" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground mb-1">AI Analysis</h4>
                <p className="text-sm text-muted-foreground">{aiAnalysis?.recommendation}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Clock" size={16} color="var(--color-primary)" />
                <span className="text-foreground">Estimated wait: {aiAnalysis?.estimatedWaitTime}</span>
              </div>
              <div className="mt-3">
                <p className="text-sm font-medium text-foreground mb-2">Preparation Tips:</p>
                <ul className="space-y-1">
                  {aiAnalysis?.preparationTips?.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Icon name="CheckCircle" size={14} color="var(--color-success)" className="mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {formData?.urgencyLevel === 'emergency' && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" />
              <div>
                <h4 className="text-sm font-semibold text-error mb-1">Emergency Notice</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  For life-threatening emergencies, please call 911 or visit the nearest emergency room.
                </p>
                <p className="text-sm font-medium text-foreground">Emergency Hotline: 1-800-EMERGENCY</p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-border">
          <div className="bg-muted rounded-lg p-4 mb-4">
            <h4 className="text-sm font-semibold text-foreground mb-3">Appointment Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Doctor:</span>
                <span className="font-medium text-foreground">{selectedDoctor?.name || 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium text-foreground">
                  {selectedDate ? selectedDate?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Not selected'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-medium text-foreground">{selectedSlot?.time || 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Consultation Fee:</span>
                <span className="font-medium text-foreground">${selectedDoctor?.consultationFee || '0'}</span>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="default"
            fullWidth
            iconName="Calendar"
            iconPosition="left"
          >
            Confirm Appointment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
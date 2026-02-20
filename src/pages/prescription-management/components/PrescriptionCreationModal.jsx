import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PrescriptionCreationModal = ({ isOpen, onClose, onSave, editingPrescription, patientData }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    patientAge: '',
    patientPhone: '',
    medication: '',
    genericName: '',
    dosage: '',
    frequency: '',
    duration: '',
    totalRefills: '0',
    instructions: '',
    pharmacy: ''
  });

  const [searchResults, setSearchResults] = useState([]);
  const [showDrugSearch, setShowDrugSearch] = useState(false);
  const [warnings, setWarnings] = useState([]);

  const medicationDatabase = [
    { name: 'Amoxicillin', generic: 'Amoxicillin', category: 'Antibiotic', commonDosages: ['250mg', '500mg', '875mg'] },
    { name: 'Lisinopril', generic: 'Lisinopril', category: 'ACE Inhibitor', commonDosages: ['5mg', '10mg', '20mg', '40mg'] },
    { name: 'Metformin', generic: 'Metformin HCl', category: 'Antidiabetic', commonDosages: ['500mg', '850mg', '1000mg'] },
    { name: 'Atorvastatin', generic: 'Atorvastatin Calcium', category: 'Statin', commonDosages: ['10mg', '20mg', '40mg', '80mg'] },
    { name: 'Omeprazole', generic: 'Omeprazole', category: 'Proton Pump Inhibitor', commonDosages: ['20mg', '40mg'] },
    { name: 'Levothyroxine', generic: 'Levothyroxine Sodium', category: 'Thyroid Hormone', commonDosages: ['25mcg', '50mcg', '75mcg', '100mcg'] },
    { name: 'Amlodipine', generic: 'Amlodipine Besylate', category: 'Calcium Channel Blocker', commonDosages: ['2.5mg', '5mg', '10mg'] },
    { name: 'Metoprolol', generic: 'Metoprolol Tartrate', category: 'Beta Blocker', commonDosages: ['25mg', '50mg', '100mg'] }
  ];

  const frequencyOptions = [
    { value: 'once_daily', label: 'Once Daily' },
    { value: 'twice_daily', label: 'Twice Daily (BID)' },
    { value: 'three_times', label: 'Three Times Daily (TID)' },
    { value: 'four_times', label: 'Four Times Daily (QID)' },
    { value: 'every_6_hours', label: 'Every 6 Hours' },
    { value: 'every_8_hours', label: 'Every 8 Hours' },
    { value: 'every_12_hours', label: 'Every 12 Hours' },
    { value: 'as_needed', label: 'As Needed (PRN)' }
  ];

  const pharmacyOptions = [
    { value: 'cvs_main', label: 'CVS Pharmacy - Main Street' },
    { value: 'walgreens_downtown', label: 'Walgreens - Downtown' },
    { value: 'walmart_pharmacy', label: 'Walmart Pharmacy' },
    { value: 'rite_aid', label: 'Rite Aid Pharmacy' }
  ];

  useEffect(() => {
    if (editingPrescription) {
      setFormData({
        patientId: editingPrescription?.patientId,
        medication: editingPrescription?.medication,
        genericName: editingPrescription?.genericName,
        dosage: editingPrescription?.dosage,
        frequency: editingPrescription?.frequency,
        duration: editingPrescription?.duration || '',
        totalRefills: editingPrescription?.totalRefills?.toString(),
        instructions: editingPrescription?.instructions || '',
        pharmacy: editingPrescription?.pharmacy || ''
      });
    } else if (patientData) {
      setFormData(prev => ({ ...prev, patientId: patientData?.id }));
    }
  }, [editingPrescription, patientData]);

  useEffect(() => {
    if (formData?.medication) {
      checkDrugInteractions();
    }
  }, [formData?.medication]);

  const handleMedicationSearch = (searchTerm) => {
    if (searchTerm?.length < 2) {
      setSearchResults([]);
      return;
    }

    const results = medicationDatabase?.filter(med =>
      med?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      med?.generic?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
    setSearchResults(results);
    setShowDrugSearch(true);
  };

  const handleMedicationSelect = (medication) => {
    setFormData(prev => ({
      ...prev,
      medication: medication?.name,
      genericName: medication?.generic
    }));
    setShowDrugSearch(false);
    setSearchResults([]);
  };

  const checkDrugInteractions = () => {
    const newWarnings = [];

    if (patientData?.allergies?.includes('Penicillin') && formData?.medication?.toLowerCase()?.includes('amoxicillin')) {
      newWarnings?.push({
        severity: 'high',
        message: 'Patient has documented Penicillin allergy. Consider alternative antibiotic.'
      });
    }

    if (patientData?.currentMedications?.some(med => med?.includes('Warfarin')) &&
      formData?.medication?.toLowerCase()?.includes('aspirin')) {
      newWarnings?.push({
        severity: 'medium',
        message: 'Potential interaction with Warfarin. Monitor INR levels closely.'
      });
    }

    setWarnings(newWarnings);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSave(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      patientId: '',
      patientName: '',
      patientAge: '',
      patientPhone: '',
      medication: '',
      genericName: '',
      dosage: '',
      frequency: '',
      duration: '',
      totalRefills: '0',
      instructions: '',
      pharmacy: ''
    });
    setWarnings([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-xl border border-border shadow-elevation-4 w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {editingPrescription ? 'Edit Prescription' : 'Create New Prescription'}
            </h2>
            {patientData && (
              <p className="text-sm text-muted-foreground mt-1 font-caption">
                Patient: {patientData?.name} (ID: {patientData?.id})
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          {warnings?.length > 0 && (
            <div className="mb-6 space-y-2">
              {warnings?.map((warning, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-4 rounded-lg border ${warning?.severity === 'high' ? 'bg-error/10 border-error/20 text-error' : 'bg-warning/10 border-warning/20 text-warning'
                    }`}
                >
                  <Icon name="AlertTriangle" size={20} className="flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      {warning?.severity === 'high' ? 'Critical Warning' : 'Caution'}
                    </p>
                    <p className="text-sm mt-1">{warning?.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-6">
            {!patientData && (
              <div className="bg-muted/30 p-4 rounded-lg border border-border space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Patient Details</h3>
                <Input
                  label="Patient Name"
                  placeholder="Full Name"
                  value={formData.patientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Age"
                    type="number"
                    placeholder="Age"
                    value={formData.patientAge}
                    onChange={(e) => setFormData(prev => ({ ...prev, patientAge: e.target.value }))}
                    required
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.patientPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, patientPhone: e.target.value }))}
                    required
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <Input
                label="Medication Name"
                type="text"
                placeholder="Search medication..."
                value={formData?.medication}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, medication: e?.target?.value }));
                  handleMedicationSearch(e?.target?.value);
                }}
                required
              />

              {showDrugSearch && searchResults?.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-elevation-3 max-h-64 overflow-y-auto z-10">
                  {searchResults?.map((med, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleMedicationSelect(med)}
                      className="w-full px-4 py-3 text-left hover:bg-muted transition-smooth border-b border-border last:border-0"
                    >
                      <p className="text-sm font-medium text-foreground">{med?.name}</p>
                      <p className="text-xs text-muted-foreground font-caption">{med?.generic} - {med?.category}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Input
              label="Generic Name"
              type="text"
              placeholder="Generic medication name"
              value={formData?.genericName}
              onChange={(e) => setFormData(prev => ({ ...prev, genericName: e?.target?.value }))}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Input
                label="Dosage"
                type="text"
                placeholder="e.g., 500mg"
                value={formData?.dosage}
                onChange={(e) => setFormData(prev => ({ ...prev, dosage: e?.target?.value }))}
                required
              />

              <Select
                label="Frequency"
                placeholder="Select frequency"
                options={frequencyOptions}
                value={formData?.frequency}
                onChange={(value) => setFormData(prev => ({ ...prev, frequency: value }))}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Input
                label="Duration"
                type="text"
                placeholder="e.g., 7 days, 2 weeks"
                value={formData?.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e?.target?.value }))}
                required
              />

              <Input
                label="Total Refills"
                type="number"
                min="0"
                max="12"
                placeholder="0"
                value={formData?.totalRefills}
                onChange={(e) => setFormData(prev => ({ ...prev, totalRefills: e?.target?.value }))}
                required
              />
            </div>

            <Select
              label="Pharmacy"
              placeholder="Select pharmacy"
              options={pharmacyOptions}
              value={formData?.pharmacy}
              onChange={(value) => setFormData(prev => ({ ...prev, pharmacy: value }))}
              searchable
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Instructions for Patient
              </label>
              <textarea
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none"
                rows="4"
                placeholder="e.g., Take with food. Avoid alcohol. Complete full course."
                value={formData?.instructions}
                onChange={(e) => setFormData(prev => ({ ...prev, instructions: e?.target?.value }))}
              />
            </div>
          </div>
        </form>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            iconName="Check"
            iconPosition="left"
          >
            {editingPrescription ? 'Update Prescription' : 'Create Prescription'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionCreationModal;
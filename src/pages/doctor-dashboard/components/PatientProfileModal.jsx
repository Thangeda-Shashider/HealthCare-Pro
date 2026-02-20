import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PatientProfileModal = ({ patient, onClose }) => {
    if (!patient) return null;

    // Mock extended details if not present
    const details = {
        ...patient,
        age: patient.age || 34,
        gender: patient.gender || 'Female',
        phone: patient.phone || '(555) 123-4567',
        email: patient.email || 'patient@example.com',
        address: patient.address || '123 Main St, Springfield',
        bloodType: patient.bloodType || 'O+',
        history: patient.history || [
            { date: '2025-10-15', type: 'Checkup', doctor: 'Dr. Smith', notes: 'Regular annual checkup, all vitals normal.' },
            { date: '2025-06-20', type: 'Consultation', doctor: 'Dr. Smith', notes: 'Reported mild headaches. Prescribed resting and hydration.' }
        ],
        allergies: patient.allergies || ['Penicillin', 'Peanuts'],
        currentMedications: patient.currentMedications || ['Vitamin D', 'Ibuprofen (PRN)']
    };

    return (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-card w-full max-w-4xl rounded-xl border border-border shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                            <span className="text-2xl font-bold text-primary">{details.name.charAt(0)}</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-foreground">{details.name}</h2>
                            <div className="flex items-center gap-3 text-muted-foreground text-sm mt-1">
                                <span className="flex items-center gap-1"><Icon name="User" size={14} /> {details.gender}, {details.age} yrs</span>
                                <span className="flex items-center gap-1"><Icon name="Phone" size={14} /> {details.phone}</span>
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Left Column: Vitals & Info */}
                        <div className="space-y-6">
                            <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
                                <h3 className="font-semibold mb-4 flex items-center gap-2"><Icon name="Activity" size={18} className="text-primary" /> Vitals & Info</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between py-2 border-b border-border/50">
                                        <span className="text-muted-foreground text-sm">Blood Type</span>
                                        <span className="font-medium">{details.bloodType}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-border/50">
                                        <span className="text-muted-foreground text-sm">Height</span>
                                        <span className="font-medium">170 cm</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-border/50">
                                        <span className="text-muted-foreground text-sm">Weight</span>
                                        <span className="font-medium">65 kg</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-border/50">
                                        <span className="text-muted-foreground text-sm">BMI</span>
                                        <span className="font-medium">22.5</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-error/5 border border-error/20 rounded-lg p-5">
                                <h3 className="font-semibold text-error mb-3 flex items-center gap-2"><Icon name="AlertTriangle" size={18} /> Allergies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {details.allergies.map((allergy, i) => (
                                        <span key={i} className="px-2 py-1 bg-error/10 text-error rounded-md text-xs font-medium border border-error/20">{allergy}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Middle Column: History */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold flex items-center gap-2"><Icon name="FileText" size={18} className="text-primary" /> Medical History</h3>
                                    <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">Add Record</Button>
                                </div>
                                <div className="space-y-4">
                                    {details.history.map((record, i) => (
                                        <div key={i} className="flex gap-4 p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/50 transition-colors">
                                            <div className="mt-1">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <Icon name="Calendar" size={14} className="text-primary" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="font-semibold text-foreground">{record.type}</h4>
                                                    <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded-full border">{record.date}</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-2">{record.notes}</p>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Icon name="User" size={12} /> {record.doctor}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                                <h3 className="font-semibold mb-4 flex items-center gap-2"><Icon name="Pill" size={18} className="text-secondary" /> Current Medications</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {details.currentMedications.map((med, i) => (
                                        <div key={i} className="p-3 bg-secondary/5 border border-secondary/20 rounded-lg flex items-center gap-3">
                                            <Icon name="CheckCircle" size={16} className="text-secondary" />
                                            <span className="font-medium text-sm">{med}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-border p-4 bg-muted/10 flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose}>Close</Button>
                    <Button iconName="MessageSquare" iconPosition="left">Message Patient</Button>
                </div>
            </div>
        </div>
    );
};

export default PatientProfileModal;

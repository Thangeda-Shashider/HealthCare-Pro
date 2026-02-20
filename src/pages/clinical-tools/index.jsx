import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import DashboardNavigation from '../../components/ui/DashboardNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ClinicalTools = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState('doctor');
    const [isNavCollapsed, setIsNavCollapsed] = useState(false);

    // BMI Calculator State
    const [bmiData, setBmiData] = useState({ weight: '', height: '' });
    const [bmiResult, setBmiResult] = useState(null);

    // Dosage Calculator State
    const [dosageData, setDosageData] = useState({ weight: '', dosePerKg: '', concentration: '' });
    const [dosageResult, setDosageResult] = useState(null);

    useEffect(() => {
        const role = localStorage.getItem('userRole') || 'doctor';
        setUserRole(role);
    }, []);

    const calculateBMI = () => {
        const w = parseFloat(bmiData.weight);
        const h = parseFloat(bmiData.height) / 100; // convert cm to m
        if (w && h) {
            const bmi = (w / (h * h)).toFixed(1);
            let status = '';
            if (bmi < 18.5) status = 'Underweight';
            else if (bmi < 25) status = 'Normal';
            else if (bmi < 30) status = 'Overweight';
            else status = 'Obese';
            setBmiResult({ value: bmi, status });
        }
    };

    const calculateDosage = () => {
        const weight = parseFloat(dosageData.weight);
        const dose = parseFloat(dosageData.dosePerKg);
        const conc = parseFloat(dosageData.concentration) || 1; // avoid division by zero

        if (weight && dose) {
            const totalDose = weight * dose;
            const volume = totalDose / conc;
            setDosageResult({ totalDose: totalDose.toFixed(1), volume: volume.toFixed(1) });
        }
    };

    const tools = [
        {
            id: 'symptom-checker',
            name: 'Symptom Checker',
            description: 'Analyze patient symptoms to identify potential conditions.',
            icon: 'Activity',
            color: 'text-primary',
            bg: 'bg-primary/10',
            action: () => alert('Symptom Checker module coming soon.')
        },
        {
            id: 'drug-interaction',
            name: 'Drug Interactions',
            description: 'Check for potential adverse reactions between medications.',
            icon: 'AlertTriangle',
            color: 'text-warning',
            bg: 'bg-warning/10',
            action: () => navigate('/prescription-management') // reuse existing
        },
        {
            id: 'icd-search',
            name: 'ICD-10 Search',
            description: 'Search and browse the complete ICD-10 coding system.',
            icon: 'Search',
            color: 'text-secondary',
            bg: 'bg-secondary/10',
            action: () => alert('ICD-10 Database connection required.')
        },
        {
            id: 'lab-values',
            name: 'Lab Ref. Values',
            description: 'Standard reference ranges for common laboratory tests.',
            icon: 'Clipboard',
            color: 'text-success',
            bg: 'bg-success/10',
            action: () => alert('Reference values modal opening...')
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <RoleBasedHeader userRole={userRole} userName="Dr. Michael Chen" />
            <DashboardNavigation
                userRole={userRole}
                isCollapsed={isNavCollapsed}
                onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)}
            />

            <main className={`pt-[72px] transition-all duration-250 ${isNavCollapsed ? 'lg:pl-[80px]' : 'lg:pl-[280px]'}`}>
                <div className="p-4 md:p-6 lg:p-8">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                            Clinical Tools
                        </h1>
                        <p className="text-muted-foreground">
                            Utilities and calculators to assist in clinical decision making.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

                        {/* BMI Calculator Widget */}
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-500/10 rounded-lg"><Icon name="User" size={24} className="text-blue-500" /></div>
                                <h3 className="text-xl font-bold">BMI Calculator</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Weight (kg)"
                                        type="number"
                                        placeholder="70"
                                        value={bmiData.weight}
                                        onChange={(e) => setBmiData({ ...bmiData, weight: e.target.value })}
                                    />
                                    <Input
                                        label="Height (cm)"
                                        type="number"
                                        placeholder="175"
                                        value={bmiData.height}
                                        onChange={(e) => setBmiData({ ...bmiData, height: e.target.value })}
                                    />
                                </div>
                                <Button fullWidth onClick={calculateBMI}>Calculate BMI</Button>

                                {bmiResult && (
                                    <div className="mt-4 p-4 bg-muted/50 rounded-lg text-center animate-in fade-in zoom-in">
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Result</p>
                                        <p className="text-3xl font-bold text-foreground mb-1">{bmiResult.value}</p>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${bmiResult.status === 'Normal' ? 'bg-success/10 text-success' :
                                            bmiResult.status === 'Obese' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                                            }`}>
                                            {bmiResult.status}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dosage Calculator Widget */}
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-500/10 rounded-lg"><Icon name="Pipette" size={24} className="text-purple-500" /></div>
                                <h3 className="text-xl font-bold">Pediatric Dosage</h3>
                            </div>
                            <div className="space-y-4">
                                <Input
                                    label="Patient Weight (kg)"
                                    type="number"
                                    placeholder="20"
                                    value={dosageData.weight}
                                    onChange={(e) => setDosageData({ ...dosageData, weight: e.target.value })}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Dose (mg/kg)"
                                        type="number"
                                        placeholder="10"
                                        value={dosageData.dosePerKg}
                                        onChange={(e) => setDosageData({ ...dosageData, dosePerKg: e.target.value })}
                                    />
                                    <Input
                                        label="Conc. (mg/mL)"
                                        type="number"
                                        placeholder="50"
                                        value={dosageData.concentration}
                                        onChange={(e) => setDosageData({ ...dosageData, concentration: e.target.value })}
                                    />
                                </div>
                                <Button variant="outline" fullWidth onClick={calculateDosage}>Calculate Volume</Button>

                                {dosageResult && (
                                    <div className="mt-4 p-4 bg-muted/50 rounded-lg grid grid-cols-2 gap-4 animate-in fade-in zoom-in">
                                        <div className="text-center">
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Dose</p>
                                            <p className="text-xl font-bold">{dosageResult.totalDose} mg</p>
                                        </div>
                                        <div className="text-center border-l border-border">
                                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Volume</p>
                                            <p className="text-xl font-bold text-primary">{dosageResult.volume} mL</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Links / Other Tools */}
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-orange-500/10 rounded-lg"><Icon name="Zap" size={24} className="text-orange-500" /></div>
                                <h3 className="text-xl font-bold">Quick Access</h3>
                            </div>
                            <div className="flex-1 space-y-3">
                                {tools.map(tool => (
                                    <button
                                        key={tool.id}
                                        onClick={tool.action}
                                        className="w-full flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-all border border-transparent hover:border-border text-left group"
                                    >
                                        <div className={`p-2 rounded-md ${tool.bg} ${tool.color} group-hover:scale-110 transition-transform`}>
                                            <Icon name={tool.icon} size={18} />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-foreground">{tool.name}</h4>
                                            <p className="text-xs text-muted-foreground line-clamp-1">{tool.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Reference Tables Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Common Reference Tables</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h3 className="font-semibold mb-4">Vital Signs (Adult)</h3>
                                <div className="overflow-hidden rounded-lg border border-border">
                                    <table className="w-full text-sm">
                                        <thead className="bg-muted">
                                            <tr>
                                                <th className="p-2 text-left">Parameter</th>
                                                <th className="p-2 text-left">Normal Range</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            <tr><td className="p-2">Heart Rate</td><td className="p-2">60 - 100 bpm</td></tr>
                                            <tr><td className="p-2">Respiratory Rate</td><td className="p-2">12 - 20 bpm</td></tr>
                                            <tr><td className="p-2">Blood Pressure</td><td className="p-2">90/60 - 120/80 mmHg</td></tr>
                                            <tr><td className="p-2">Temperature</td><td className="p-2">36.5 - 37.2 °C</td></tr>
                                            <tr><td className="p-2">SpO2</td><td className="p-2">95 - 100%</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h3 className="font-semibold mb-4">Glucose Levels</h3>
                                <div className="overflow-hidden rounded-lg border border-border">
                                    <table className="w-full text-sm">
                                        <thead className="bg-muted">
                                            <tr>
                                                <th className="p-2 text-left">State</th>
                                                <th className="p-2 text-left">Normal Range (mg/dL)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            <tr><td className="p-2">Fasting</td><td className="p-2">70 - 99</td></tr>
                                            <tr><td className="p-2">Post-prandial (2h)</td><td className="p-2">&lt; 140</td></tr>
                                            <tr><td className="p-2">Pre-diabetes</td><td className="p-2">100 - 125 (Fasting)</td></tr>
                                            <tr><td className="p-2">Diabetes</td><td className="p-2">&ge; 126 (Fasting)</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ClinicalTools;

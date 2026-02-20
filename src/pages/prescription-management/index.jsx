import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import DashboardNavigation from '../../components/ui/DashboardNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';
import PrescriptionTable from './components/PrescriptionTable';
import PrescriptionCreationModal from './components/PrescriptionCreationModal';
import PrescriptionDetailModal from './components/PrescriptionDetailModal';
import MedicationHistoryPanel from './components/MedicationHistoryPanel';
import RefillRequestPanel from './components/RefillRequestPanel';
import DrugInteractionChecker from './components/DrugInteractionChecker';
import ComplianceTracker from './components/ComplianceTracker';

const PrescriptionManagement = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('doctor');
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole') || 'doctor';
    setUserRole(role);
  }, []);

  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      prescriptionNumber: 'RX-2024-001234',
      patientName: 'Sarah Johnson',
      patientId: 'PT-45678',
      patientAge: 45,
      patientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1b7c47eff-1763293873152.png",
      patientImageAlt: 'Professional woman with shoulder length brown hair wearing blue medical scrubs smiling warmly at camera',
      medication: 'Lisinopril',
      genericName: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once Daily',
      duration: '30 days',
      quantity: '30 tablets',
      date: '12/20/2024',
      expiryDate: '12/20/2025',
      refillsRemaining: 3,
      totalRefills: 5,
      lastRefillDate: '11/20/2024',
      status: 'active',
      instructions: 'Take in the morning with or without food. Monitor blood pressure regularly.',
      doctorName: 'Dr. Michael Chen',
      doctorSpecialty: 'Cardiologist',
      doctorLicense: 'MD-123456',
      doctorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_104008a87-1763299273300.png",
      doctorImageAlt: 'Professional male doctor with short black hair wearing white coat and stethoscope in medical office',
      pharmacy: 'CVS Pharmacy - Main Street',
      pharmacyAddress: '123 Main Street, New York, NY 10001',
      pharmacyPhone: '(555) 123-4567'
    },
    {
      id: 2,
      prescriptionNumber: 'RX-2024-001235',
      patientName: 'Michael Brown',
      patientId: 'PT-45679',
      patientAge: 62,
      patientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_134653558-1763295042672.png",
      patientImageAlt: 'Senior man with gray hair and glasses wearing casual blue shirt smiling confidently',
      medication: 'Metformin',
      genericName: 'Metformin HCl',
      dosage: '500mg',
      frequency: 'Twice Daily',
      duration: '90 days',
      quantity: '180 tablets',
      date: '12/15/2024',
      expiryDate: '03/15/2025',
      refillsRemaining: 2,
      totalRefills: 3,
      lastRefillDate: '09/15/2024',
      status: 'active',
      instructions: 'Take with meals to reduce stomach upset. Monitor blood sugar levels daily.',
      doctorName: 'Dr. Emily Rodriguez',
      doctorSpecialty: 'Endocrinologist',
      doctorLicense: 'MD-789012',
      doctorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_113dbdb97-1763298762709.png",
      doctorImageAlt: 'Professional female doctor with long dark hair wearing white medical coat with stethoscope',
      pharmacy: 'Walgreens - Downtown',
      pharmacyAddress: '456 Oak Avenue, New York, NY 10002',
      pharmacyPhone: '(555) 234-5678'
    },
    {
      id: 3,
      prescriptionNumber: 'RX-2024-001236',
      patientName: 'Jennifer Davis',
      patientId: 'PT-45680',
      patientAge: 38,
      patientImage: "https://images.unsplash.com/photo-1580768927356-257b64e374f2",
      patientImageAlt: 'Young woman with blonde hair in ponytail wearing green athletic wear smiling brightly',
      medication: 'Amoxicillin',
      genericName: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Three Times Daily',
      duration: '7 days',
      quantity: '21 capsules',
      date: '12/22/2024',
      expiryDate: '12/29/2024',
      refillsRemaining: 0,
      totalRefills: 0,
      lastRefillDate: 'N/A',
      status: 'expiring',
      instructions: 'Take every 8 hours. Complete full course even if symptoms improve.',
      doctorName: 'Dr. James Wilson',
      doctorSpecialty: 'General Practitioner',
      doctorLicense: 'MD-345678',
      doctorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_17da88877-1763294146749.png",
      doctorImageAlt: 'Middle aged male doctor with salt and pepper hair wearing white coat and blue tie',
      pharmacy: 'Walmart Pharmacy',
      pharmacyAddress: '789 Elm Street, New York, NY 10003',
      pharmacyPhone: '(555) 345-6789'
    },
    {
      id: 4,
      prescriptionNumber: 'RX-2024-001237',
      patientName: 'Robert Martinez',
      patientId: 'PT-45681',
      patientAge: 55,
      patientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1bc5fda4b-1763296654049.png",
      patientImageAlt: 'Professional Hispanic man with short dark hair wearing navy business suit and red tie',
      medication: 'Atorvastatin',
      genericName: 'Atorvastatin Calcium',
      dosage: '20mg',
      frequency: 'Once Daily',
      duration: '90 days',
      quantity: '90 tablets',
      date: '11/28/2024',
      expiryDate: '11/28/2025',
      refillsRemaining: 5,
      totalRefills: 6,
      lastRefillDate: '08/28/2024',
      status: 'active',
      instructions: 'Take in the evening. Avoid grapefruit juice. Monitor cholesterol levels.',
      doctorName: 'Dr. Michael Chen',
      doctorSpecialty: 'Cardiologist',
      doctorLicense: 'MD-123456',
      doctorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_104008a87-1763299273300.png",
      doctorImageAlt: 'Professional male doctor with short black hair wearing white coat and stethoscope in medical office',
      pharmacy: 'CVS Pharmacy - Main Street',
      pharmacyAddress: '123 Main Street, New York, NY 10001',
      pharmacyPhone: '(555) 123-4567'
    }
  ]);


  const mockMedicationHistory = [
    {
      id: 1,
      medication: 'Lisinopril',
      genericName: 'Lisinopril',
      dosage: '5mg',
      frequency: 'Once Daily',
      duration: '90 days',
      startDate: '06/15/2024',
      endDate: '09/15/2024',
      status: 'completed',
      effectivenessRating: 4,
      effectivenessNotes: 'Blood pressure well controlled. No significant side effects.',
      sideEffects: ['Mild dizziness initially'],
      prescribedBy: 'Dr. Michael Chen'
    },
    {
      id: 2,
      medication: 'Metformin',
      genericName: 'Metformin HCl',
      dosage: '500mg',
      frequency: 'Once Daily',
      duration: '60 days',
      startDate: '07/01/2024',
      endDate: '08/30/2024',
      status: 'discontinued',
      effectivenessRating: 3,
      effectivenessNotes: 'Dosage increased due to insufficient glucose control.',
      sideEffects: ['Nausea', 'Stomach upset'],
      prescribedBy: 'Dr. Emily Rodriguez'
    },
    {
      id: 3,
      medication: 'Omeprazole',
      genericName: 'Omeprazole',
      dosage: '20mg',
      frequency: 'Once Daily',
      duration: '30 days',
      startDate: '10/01/2024',
      endDate: '10/31/2024',
      status: 'completed',
      effectivenessRating: 5,
      effectivenessNotes: 'Complete relief from acid reflux symptoms.',
      sideEffects: [],
      prescribedBy: 'Dr. James Wilson'
    }];


  const [refillRequests, setRefillRequests] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      patientId: 'PT-45678',
      patientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1b7c47eff-1763293873152.png",
      patientImageAlt: 'Professional woman with shoulder length brown hair wearing blue medical scrubs smiling warmly at camera',
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once Daily',
      quantity: '30 tablets',
      requestDate: '12/26/2024',
      lastRefillDate: '11/26/2024',
      refillsRemaining: 2,
      priority: 'normal',
      notes: 'Running low on medication, need refill before next appointment.'
    },
    {
      id: 2,
      patientName: 'Robert Martinez',
      patientId: 'PT-45681',
      patientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1bc5fda4b-1763296654049.png",
      patientImageAlt: 'Professional Hispanic man with short dark hair wearing navy business suit and red tie',
      medication: 'Insulin Glargine',
      dosage: '100 units/mL',
      frequency: 'Once Daily',
      quantity: '1 vial',
      requestDate: '12/27/2024',
      lastRefillDate: '11/27/2024',
      refillsRemaining: 1,
      priority: 'urgent',
      notes: 'Last vial almost empty. Patient is diabetic and needs urgent refill.'
    },
    {
      id: 3,
      patientName: 'Jennifer Davis',
      patientId: 'PT-45680',
      patientImage: "https://images.unsplash.com/photo-1580768927356-257b64e374f2",
      patientImageAlt: 'Young woman with blonde hair in ponytail wearing green athletic wear smiling brightly',
      medication: 'Levothyroxine',
      dosage: '75mcg',
      frequency: 'Once Daily',
      quantity: '90 tablets',
      requestDate: '12/25/2024',
      lastRefillDate: '09/25/2024',
      refillsRemaining: 3,
      priority: 'high',
      notes: 'Traveling next week, need refill before departure.'
    }]);


  const mockComplianceData = {
    overallRate: 87,
    dosesTaken: 156,
    dosesScheduled: 180,
    medications: [
      {
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once Daily',
        complianceRate: 95,
        taken: 57,
        missed: 3,
        lastDose: '12/27/2024 8:00 AM'
      },
      {
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice Daily',
        complianceRate: 82,
        taken: 98,
        missed: 22,
        lastDose: '12/27/2024 7:30 PM'
      },
      {
        name: 'Atorvastatin',
        dosage: '20mg',
        frequency: 'Once Daily',
        complianceRate: 90,
        taken: 54,
        missed: 6,
        lastDose: '12/27/2024 9:00 PM'
      }]

  };

  const patientMedications = ['Lisinopril', 'Metformin', 'Atorvastatin'];
  const patientAllergies = ['Penicillin', 'Sulfa drugs'];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'expiring', label: 'Expiring Soon' },
    { value: 'expired', label: 'Expired' },
    { value: 'pending', label: 'Pending' }];


  const filteredPrescriptions = prescriptions?.filter((prescription) => {
    const matchesSearch = prescription?.patientName?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      prescription?.medication?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      prescription?.patientId?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus = filterStatus === 'all' || prescription?.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreatePrescription = () => {
    setEditingPrescription(null);
    setIsCreationModalOpen(true);
  };

  const handleEditPrescription = (prescription) => {
    setEditingPrescription(prescription);
    setIsCreationModalOpen(true);
  };

  const handleViewPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setIsDetailModalOpen(true);
  };

  const handleRefillRequest = (prescription) => {
    alert(`Refill request submitted for ${prescription?.medication}`);
  };

  const handleSavePrescription = (formData) => {
    if (editingPrescription) {
      setPrescriptions(prev => prev.map(p =>
        p.id === editingPrescription.id ? { ...p, ...formData } : p
      ));
    } else {
      const newPrescription = {
        id: Date.now(),
        prescriptionNumber: `RX-${new Date().getFullYear()}-${Math.floor(Math.random() * 100000)}`,
        status: 'active',
        date: new Date().toLocaleDateString(),
        expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString(),
        refillsRemaining: parseInt(formData.totalRefills) || 0,
        ...formData
      };
      setPrescriptions(prev => [newPrescription, ...prev]);
    }
  };

  const handlePrintPrescription = () => {
    window.print();
  };

  const handleSendToPharmacy = (prescription) => {
    alert(`Prescription sent to ${prescription?.pharmacy}`);
  };

  const handleApproveRefill = (request) => {
    setRefillRequests(prev => prev.filter(req => req.id !== request.id));
    // In a real app, you would also probably update the prescription's refill status here
  };

  const handleDenyRefill = (request) => {
    setRefillRequests(prev => prev.filter(req => req.id !== request.id));
  };

  const handleViewHistoryDetails = (item) => {
    setSelectedHistoryItem(item);
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader userRole={userRole} userName="Dr. Michael Chen" />
      <DashboardNavigation
        userRole={userRole}
        isCollapsed={isNavCollapsed}
        onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)} />

      <main
        className={`pt-[72px] transition-all duration-250 ${isNavCollapsed ? 'lg:pl-[80px]' : 'lg:pl-[280px]'}`
        }>

        <div className="p-4 md:p-6 lg:p-8">
          {/* Header Section */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Prescription Management
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Create, manage, and track digital prescriptions with integrated pharmacy communication
                </p>
              </div>
              {userRole === 'doctor' &&
                <Button
                  onClick={handleCreatePrescription}
                  iconName="Plus"
                  iconPosition="left"
                  size="lg"
                  className="w-full lg:w-auto">

                  New Prescription
                </Button>
              }
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-card rounded-xl border border-border p-4 md:p-6 shadow-elevation-1">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name="FileText" size={20} color="var(--color-primary)" />
                  </div>
                  <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full font-medium">
                    Active
                  </span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-1 data-text">24</p>
                <p className="text-xs md:text-sm text-muted-foreground font-caption">Active Prescriptions</p>
              </div>

              <div className="bg-card rounded-xl border border-border p-4 md:p-6 shadow-elevation-1">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Icon name="Clock" size={20} color="var(--color-warning)" />
                  </div>
                  <span className="text-xs px-2 py-1 bg-warning/10 text-warning rounded-full font-medium">
                    Pending
                  </span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-1 data-text">3</p>
                <p className="text-xs md:text-sm text-muted-foreground font-caption">Refill Requests</p>
              </div>

              <div className="bg-card rounded-xl border border-border p-4 md:p-6 shadow-elevation-1">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Icon name="RefreshCw" size={20} color="var(--color-secondary)" />
                  </div>
                  <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full font-medium">
                    Available
                  </span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-1 data-text">47</p>
                <p className="text-xs md:text-sm text-muted-foreground font-caption">Total Refills</p>
              </div>

              <div className="bg-card rounded-xl border border-border p-4 md:p-6 shadow-elevation-1">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-success/10 flex items-center justify-center">
                    <Icon name="TrendingUp" size={20} color="var(--color-success)" />
                  </div>
                  <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full font-medium">
                    +12%
                  </span>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-1 data-text">87%</p>
                <p className="text-xs md:text-sm text-muted-foreground font-caption">Compliance Rate</p>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-6">
            <div className="border-b border-border overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {[
                  { id: 'active', label: 'Active Prescriptions', icon: 'FileText' },
                  { id: 'refills', label: 'Refill Requests', icon: 'RefreshCw' },
                  { id: 'history', label: 'Medication History', icon: 'History' },
                  { id: 'interactions', label: 'Drug Interactions', icon: 'AlertTriangle' },
                  { id: 'compliance', label: 'Compliance', icon: 'Activity' }]?.
                  map((tab) =>
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-smooth whitespace-nowrap ${activeTab === tab?.id ?
                          'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'}`
                      }>

                      <Icon name={tab?.icon} size={18} />
                      {tab?.label}
                    </button>
                  )}
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          {activeTab === 'active' &&
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="search"
                    placeholder="Search by patient name, medication, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)} />

                </div>
                <Select
                  placeholder="Filter by status"
                  options={statusOptions}
                  value={filterStatus}
                  onChange={setFilterStatus}
                  className="sm:w-48" />

              </div>
            </div>
          }

          {/* Content Area */}
          <div className="space-y-6">
            {activeTab === 'active' &&
              <PrescriptionTable
                prescriptions={filteredPrescriptions}
                onEdit={handleEditPrescription}
                onView={handleViewPrescription}
                onRefill={handleRefillRequest}
                userRole={userRole} />

            }

            {activeTab === 'refills' &&
              <RefillRequestPanel
                requests={refillRequests}
                onApprove={handleApproveRefill}
                onDeny={handleDenyRefill}
                userRole={userRole} />

            }

            {activeTab === 'history' &&
              <MedicationHistoryPanel
                history={mockMedicationHistory}
                onViewDetails={handleViewHistoryDetails} />

            }

            {activeTab === 'interactions' &&
              <DrugInteractionChecker
                patientMedications={patientMedications}
                patientAllergies={patientAllergies} />

            }

            {activeTab === 'compliance' &&
              <ComplianceTracker complianceData={mockComplianceData} />
            }
          </div>
        </div>
      </main>
      {/* Modals */}
      <PrescriptionCreationModal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        onSave={handleSavePrescription}
        editingPrescription={editingPrescription}
        patientData={editingPrescription ? {
          id: editingPrescription?.patientId,
          name: editingPrescription?.patientName,
          allergies: patientAllergies,
          currentMedications: patientMedications
        } : null} />

      <PrescriptionDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        prescription={selectedPrescription}
        onPrint={handlePrintPrescription}
        onSendToPharmacy={handleSendToPharmacy} />

      {/* History Detail Modal */}
      {selectedHistoryItem && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card w-full max-w-lg rounded-xl border border-border shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
              <h3 className="text-xl font-bold">Medication History Details</h3>
              <Button variant="ghost" size="icon" iconName="X" onClick={() => setSelectedHistoryItem(null)} />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Pill" size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">{selectedHistoryItem.medication}</h4>
                  <span className="text-sm text-muted-foreground">{selectedHistoryItem.genericName}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Dosage</span>
                  <p className="font-medium">{selectedHistoryItem.dosage}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Frequency</span>
                  <p className="font-medium">{selectedHistoryItem.frequency}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Duration</span>
                  <p className="font-medium">{selectedHistoryItem.duration}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Status</span>
                  <p className="font-medium capitalize">{selectedHistoryItem.status}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4 mt-2">
                <h5 className="font-medium mb-2">Effectiveness</h5>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className={i < selectedHistoryItem.effectivenessRating ? "text-warning fill-current" : "text-muted-foreground"} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{selectedHistoryItem.effectivenessNotes}</p>
              </div>
            </div>
            <div className="p-4 border-t border-border bg-muted/10 flex justify-end">
              <Button onClick={() => setSelectedHistoryItem(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}

    </div>);

};

export default PrescriptionManagement;
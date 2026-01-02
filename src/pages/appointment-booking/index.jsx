import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import DashboardNavigation from '../../components/ui/DashboardNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import ProgressIndicator from './components/ProgressIndicator';
import SpecialtySelector from './components/SpecialtySelector';
import DoctorCard from './components/DoctorCard';
import AppointmentCalendar from './components/AppointmentCalendar';
import BookingForm from './components/BookingForm';
import ConfirmationModal from './components/ConfirmationModal';

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const steps = [
  { id: 1, label: 'Specialty', icon: 'Stethoscope' },
  { id: 2, label: 'Doctor', icon: 'User' },
  { id: 3, label: 'Date & Time', icon: 'Calendar' },
  { id: 4, label: 'Details', icon: 'FileText' }];


  const specialties = [
  { id: 1, name: 'Cardiology', icon: 'Heart', doctorCount: 12 },
  { id: 2, name: 'Dermatology', icon: 'Sparkles', doctorCount: 8 },
  { id: 3, name: 'Neurology', icon: 'Brain', doctorCount: 10 },
  { id: 4, name: 'Orthopedics', icon: 'Bone', doctorCount: 15 },
  { id: 5, name: 'Pediatrics', icon: 'Baby', doctorCount: 9 },
  { id: 6, name: 'General Medicine', icon: 'Activity', doctorCount: 20 },
  { id: 7, name: 'Ophthalmology', icon: 'Eye', doctorCount: 7 },
  { id: 8, name: 'Dentistry', icon: 'Smile', doctorCount: 11 }];


  const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    specialtyId: 1,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b72c9492-1763295414491.png",
    imageAlt: 'Professional female doctor with blonde hair in white medical coat smiling warmly at camera',
    rating: 4.9,
    reviews: 234,
    experience: 15,
    location: 'Main Hospital, Building A',
    consultationFee: 150,
    languages: ['English', 'Spanish'],
    available: true,
    nextAvailable: 'Available Today'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    specialtyId: 1,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_126a6b0dc-1763300720152.png",
    imageAlt: 'Professional Asian male doctor with short black hair wearing white coat and stethoscope',
    rating: 4.8,
    reviews: 189,
    experience: 12,
    location: 'Main Hospital, Building A',
    consultationFee: 140,
    languages: ['English', 'Mandarin'],
    available: false,
    nextAvailable: 'Next available: Dec 30'
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Dermatology',
    specialtyId: 2,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e717666a-1763294483781.png",
    imageAlt: 'Professional Hispanic female doctor with long dark hair in medical scrubs with confident expression',
    rating: 4.9,
    reviews: 312,
    experience: 18,
    location: 'Specialty Clinic, Floor 3',
    consultationFee: 160,
    languages: ['English', 'Spanish', 'Portuguese'],
    available: true,
    nextAvailable: 'Available Today'
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Neurology',
    specialtyId: 3,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17da88877-1763294146749.png",
    imageAlt: 'Professional Caucasian male doctor with gray hair and glasses in white medical coat',
    rating: 4.7,
    reviews: 156,
    experience: 20,
    location: 'Neurology Center, Building B',
    consultationFee: 180,
    languages: ['English', 'French'],
    available: true,
    nextAvailable: 'Available Today'
  }];


  const availableSlots = {
    '2025-12-29': {
      available: 12,
      slots: [
      { time: '09:00 AM', available: true, aiRecommended: true },
      { time: '09:30 AM', available: true, aiRecommended: false },
      { time: '10:00 AM', available: true, aiRecommended: true },
      { time: '10:30 AM', available: false, aiRecommended: false },
      { time: '11:00 AM', available: true, aiRecommended: false },
      { time: '02:00 PM', available: true, aiRecommended: false },
      { time: '02:30 PM', available: true, aiRecommended: false },
      { time: '03:00 PM', available: true, aiRecommended: true }]

    },
    '2025-12-30': {
      available: 8,
      slots: [
      { time: '09:00 AM', available: true, aiRecommended: false },
      { time: '10:00 AM', available: true, aiRecommended: true },
      { time: '11:00 AM', available: false, aiRecommended: false },
      { time: '02:00 PM', available: true, aiRecommended: false },
      { time: '03:00 PM', available: true, aiRecommended: true }]

    },
    '2025-12-31': {
      available: 5,
      slots: [
      { time: '09:00 AM', available: true, aiRecommended: true },
      { time: '10:00 AM', available: false, aiRecommended: false },
      { time: '11:00 AM', available: true, aiRecommended: false }]

    }
  };

  const filteredDoctors = doctors?.filter((doctor) => {
    const matchesSpecialty = !selectedSpecialty || doctor?.specialtyId === selectedSpecialty?.id;
    const matchesSearch = !searchQuery ||
    doctor?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    doctor?.specialty?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  const handleSpecialtySelect = (specialty) => {
    setSelectedSpecialty(specialty);
    setCurrentStep(1);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setCurrentStep(2);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleContinueToDetails = () => {
    if (selectedDate && selectedSlot) {
      setCurrentStep(3);
    }
  };

  const handleFormSubmit = (formData) => {
    const details = {
      doctor: selectedDoctor?.name,
      specialty: selectedDoctor?.specialty,
      date: selectedDate?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: selectedSlot?.time,
      location: selectedDoctor?.location,
      type: formData?.appointmentType,
      fee: selectedDoctor?.consultationFee
    };
    setAppointmentDetails(details);
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    navigate('/patient-dashboard');
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (currentStep === 1) setSelectedDoctor(null);
      if (currentStep === 2) {
        setSelectedDate(null);
        setSelectedSlot(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader userRole="patient" userName="John Doe" />
      <DashboardNavigation
        userRole="patient"
        isCollapsed={isNavCollapsed}
        onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)} />

      <main
        className={`pt-[72px] transition-smooth ${
        isNavCollapsed ? 'lg:pl-[80px]' : 'lg:pl-[280px]'}`
        }>

        <div className="p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 font-heading">
                  Book Appointment
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Schedule your consultation with our expert doctors
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-success/10 border border-success/20 rounded-lg">
                  <Icon name="Zap" size={16} color="var(--color-success)" />
                  <span className="text-xs md:text-sm font-medium text-success">AI-Powered Scheduling</span>
                </div>
              </div>
            </div>

            <ProgressIndicator currentStep={currentStep} steps={steps} />

            {currentStep > 0 &&
            <div className="mb-4 md:mb-6">
                <Button
                variant="ghost"
                onClick={handleBack}
                iconName="ArrowLeft"
                iconPosition="left">

                  Back
                </Button>
              </div>
            }

            {currentStep === 0 &&
            <SpecialtySelector
              specialties={specialties}
              selectedSpecialty={selectedSpecialty}
              onSelect={handleSpecialtySelect} />

            }

            {currentStep === 1 &&
            <div className="space-y-4 md:space-y-6">
                <div className="bg-card rounded-xl shadow-elevation-2 p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-semibold text-foreground font-heading">
                      Select Doctor
                    </h3>
                    <div className="w-full md:w-80">
                      <Input
                      type="search"
                      placeholder="Search doctors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)} />

                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    {filteredDoctors?.map((doctor) =>
                  <DoctorCard
                    key={doctor?.id}
                    doctor={doctor}
                    isSelected={selectedDoctor?.id === doctor?.id}
                    onSelect={handleDoctorSelect} />

                  )}
                  </div>
                </div>
              </div>
            }

            {currentStep === 2 &&
            <div className="space-y-4 md:space-y-6">
                <AppointmentCalendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                availableSlots={availableSlots}
                onSlotSelect={handleSlotSelect}
                selectedSlot={selectedSlot} />

                {selectedDate && selectedSlot &&
              <div className="flex justify-end">
                    <Button
                  variant="default"
                  onClick={handleContinueToDetails}
                  iconName="ArrowRight"
                  iconPosition="right">

                      Continue to Details
                    </Button>
                  </div>
              }
              </div>
            }

            {currentStep === 3 &&
            <BookingForm
              onSubmit={handleFormSubmit}
              selectedDoctor={selectedDoctor}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot} />

            }
          </div>
        </div>
      </main>
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        appointmentDetails={appointmentDetails} />

    </div>);

};

export default AppointmentBooking;
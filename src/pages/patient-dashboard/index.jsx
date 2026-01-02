import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import DashboardNavigation from '../../components/ui/DashboardNavigation';
import UpcomingAppointmentCard from './components/UpcomingAppointmentCard';
import AIChatbot from './components/AIChatbot';
import QuickActionCard from './components/QuickActionCard';
import MedicalHistorySummary from './components/MedicalHistorySummary';
import NotificationAlert from './components/NotificationAlert';
import HealthMetricsCard from './components/HealthMetricsCard';
import Icon from '../../components/AppIcon';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [notifications, setNotifications] = useState([
  {
    id: 1,
    type: 'reminder',
    title: 'Appointment Reminder',
    message: 'Your appointment with Dr. Sarah Johnson is scheduled for tomorrow, December 29, 2025 at 10:00 AM. Please arrive 15 minutes early.',
    action: {
      label: 'View Details',
      onClick: () => navigate('/appointment-booking')
    }
  },
  {
    id: 2,
    type: 'followup',
    title: 'Follow-up Required',
    message: 'Dr. Michael Chen has requested a follow-up appointment for your recent consultation. Please schedule at your earliest convenience.',
    action: {
      label: 'Schedule Now',
      onClick: () => navigate('/appointment-booking')
    }
  }]
  );

  const upcomingAppointments = [
  {
    id: 1,
    doctorName: 'Dr. Sarah Johnson',
    doctorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_155748a5d-1763296653785.png",
    doctorImageAlt: 'Professional female doctor with blonde hair wearing white medical coat and stethoscope in modern clinic setting',
    specialty: 'Cardiologist',
    type: 'Consultation',
    date: '2025-12-29',
    time: '10:00',
    location: 'Cardiology Department, Building A, Room 301'
  },
  {
    id: 2,
    doctorName: 'Dr. Michael Chen',
    doctorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_148494e01-1763301579921.png",
    doctorImageAlt: 'Asian male doctor with short black hair wearing blue scrubs and stethoscope smiling in hospital corridor',
    specialty: 'General Physician',
    type: 'Follow-up',
    date: '2026-01-05',
    time: '14:30',
    location: 'General Medicine, Building B, Room 205'
  }];


  const quickActions = [
  {
    id: 1,
    title: 'Book Appointment',
    description: 'Schedule a new appointment with your preferred doctor',
    icon: 'Calendar',
    iconColor: '#0F766E',
    onClick: () => navigate('/appointment-booking')
  },
  {
    id: 2,
    title: 'View Prescriptions',
    description: 'Access your current and past prescriptions',
    icon: 'FileText',
    iconColor: '#3B82F6',
    onClick: () => navigate('/prescription-management')
  },
  {
    id: 3,
    title: 'Medical Records',
    description: 'View your complete medical history and test results',
    icon: 'FolderOpen',
    iconColor: '#8B5CF6',
    onClick: () => {}
  },
  {
    id: 4,
    title: 'Teleconsultation',
    description: 'Start a video consultation with your doctor',
    icon: 'Video',
    iconColor: '#10B981',
    onClick: () => {}
  }];


  const medicalHistory = [
  {
    id: 1,
    title: 'Annual Health Check-up',
    description: 'Complete physical examination and blood work',
    icon: 'Activity',
    status: 'Completed',
    date: '2025-12-15',
    doctor: 'Dr. Sarah Johnson',
    result: true
  },
  {
    id: 2,
    title: 'Blood Test Results',
    description: 'Comprehensive metabolic panel and lipid profile',
    icon: 'TestTube',
    status: 'Completed',
    date: '2025-12-20',
    doctor: 'Lab Department',
    result: true
  },
  {
    id: 3,
    title: 'Cardiology Consultation',
    description: 'Follow-up for hypertension management',
    icon: 'Heart',
    status: 'Scheduled',
    date: '2025-12-29',
    doctor: 'Dr. Sarah Johnson',
    result: false
  }];


  const healthMetrics = [
  {
    id: 1,
    label: 'Blood Pressure',
    value: '120/80',
    icon: 'Activity',
    status: 'normal',
    lastUpdated: 'Dec 27, 2025'
  },
  {
    id: 2,
    label: 'Heart Rate',
    value: '72 bpm',
    icon: 'Heart',
    status: 'normal',
    lastUpdated: 'Dec 27, 2025'
  },
  {
    id: 3,
    label: 'Blood Sugar',
    value: '95 mg/dL',
    icon: 'Droplet',
    status: 'normal',
    lastUpdated: 'Dec 26, 2025'
  },
  {
    id: 4,
    label: 'Weight',
    value: '165 lbs',
    icon: 'Scale',
    status: 'normal',
    lastUpdated: 'Dec 25, 2025'
  }];


  const handleReschedule = (appointmentId) => {
    navigate('/appointment-booking', { state: { rescheduleId: appointmentId } });
  };

  const handleCancel = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      console.log('Cancelling appointment:', appointmentId);
    }
  };

  const handleDismissNotification = (notificationId) => {
    setNotifications((prev) => prev?.filter((n) => n?.id !== notificationId));
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader userRole="patient" userName="John Smith" />
      <DashboardNavigation
        userRole="patient"
        isCollapsed={isNavCollapsed}
        onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)} />

      <main
        className={`pt-[72px] transition-smooth ${
        isNavCollapsed ? 'lg:pl-[80px]' : 'lg:pl-[280px]'}`
        }>

        <div className="p-4 md:p-6 lg:p-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Welcome back, John!
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
              Here's your health overview for today, December 28, 2025
            </p>
          </div>

          {notifications?.length > 0 &&
          <div className="mb-6 md:mb-8 space-y-3 md:space-y-4">
              {notifications?.map((notification) =>
            <NotificationAlert
              key={notification?.id}
              notification={notification}
              onDismiss={handleDismissNotification} />

            )}
            </div>
          }

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">
                    Upcoming Appointments
                  </h2>
                  <button
                    onClick={() => navigate('/appointment-booking')}
                    className="text-sm md:text-base text-primary hover:text-primary/80 font-medium transition-smooth flex items-center gap-2">

                    <span>View All</span>
                    <Icon name="ChevronRight" size={16} />
                  </button>
                </div>
                <div className="space-y-4 md:space-y-6">
                  {upcomingAppointments?.map((appointment) =>
                  <UpcomingAppointmentCard
                    key={appointment?.id}
                    appointment={appointment}
                    onReschedule={handleReschedule}
                    onCancel={handleCancel} />

                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-4 md:mb-6">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {quickActions?.map((action) =>
                  <QuickActionCard
                    key={action?.id}
                    title={action?.title}
                    description={action?.description}
                    icon={action?.icon}
                    iconColor={action?.iconColor}
                    onClick={action?.onClick} />

                  )}
                </div>
              </div>

              <HealthMetricsCard metrics={healthMetrics} />
              <MedicalHistorySummary history={medicalHistory} />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <AIChatbot />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default PatientDashboard;
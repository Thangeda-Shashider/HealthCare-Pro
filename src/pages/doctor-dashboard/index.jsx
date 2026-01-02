import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import DashboardNavigation from '../../components/ui/DashboardNavigation';

import Button from '../../components/ui/Button';
import DailyScheduleCard from './components/DailyScheduleCard';
import MetricsCard from './components/MetricsCard';
import PendingTaskItem from './components/PendingTaskItem';
import PatientSearchBar from './components/PatientSearchBar';
import CalendarSyncStatus from './components/CalendarSyncStatus';
import UrgentNotificationBanner from './components/UrgentNotificationBanner';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date('2025-12-28'));
  const [urgentNotification, setUrgentNotification] = useState(null);

  const todayAppointments = [
    {
      id: "APT001",
      patientName: "Sarah Johnson",
      time: "09:00 AM",
      duration: "30 min",
      type: "consultation",
      status: "scheduled",
      age: 34,
      gender: "Female",
      reason: "Persistent headaches for the past week, accompanied by mild dizziness and sensitivity to light"
    },
    {
      id: "APT002",
      patientName: "Michael Chen",
      time: "09:45 AM",
      duration: "45 min",
      type: "follow-up",
      status: "in-progress",
      age: 56,
      gender: "Male",
      reason: "Follow-up consultation for diabetes management and review of recent blood sugar monitoring results"
    },
    {
      id: "APT003",
      patientName: "Emily Rodriguez",
      time: "10:30 AM",
      duration: "30 min",
      type: "checkup",
      status: "scheduled",
      age: 28,
      gender: "Female",
      reason: "Annual health checkup and vaccination status review"
    },
    {
      id: "APT004",
      patientName: "David Thompson",
      time: "11:15 AM",
      duration: "60 min",
      type: "emergency",
      status: "scheduled",
      age: 42,
      gender: "Male",
      reason: "Severe chest pain and shortness of breath - requires immediate attention and cardiac evaluation"
    },
    {
      id: "APT005",
      patientName: "Lisa Anderson",
      time: "02:00 PM",
      duration: "30 min",
      type: "consultation",
      status: "scheduled",
      age: 45,
      gender: "Female",
      reason: "Chronic back pain management consultation"
    },
    {
      id: "APT006",
      patientName: "James Wilson",
      time: "02:45 PM",
      duration: "45 min",
      type: "follow-up",
      status: "scheduled",
      age: 61,
      gender: "Male",
      reason: "Post-surgery follow-up and wound healing assessment"
    }
  ];

  const pendingTasks = [
    {
      id: "TASK001",
      type: "prescription",
      title: "Prescription Approval Required",
      description: "Review and approve prescription for Sarah Johnson - Migraine medication",
      priority: "urgent",
      dueTime: "30 min"
    },
    {
      id: "TASK002",
      type: "report",
      title: "Medical Report Review",
      description: "Review lab results for Michael Chen - Blood glucose and HbA1c levels",
      priority: "high",
      dueTime: "1 hour"
    },
    {
      id: "TASK003",
      type: "followup",
      title: "Follow-up Call Required",
      description: "Contact Emily Rodriguez regarding vaccination schedule confirmation",
      priority: "medium",
      dueTime: "2 hours"
    },
    {
      id: "TASK004",
      type: "review",
      title: "Patient History Review",
      description: "Review complete medical history for new patient David Thompson before emergency consultation",
      priority: "urgent",
      dueTime: "45 min"
    }
  ];

  const recentPatients = [
    { id: "PAT001", name: "Sarah Johnson" },
    { id: "PAT002", name: "Michael Chen" },
    { id: "PAT003", name: "Emily Rodriguez" },
    { id: "PAT004", name: "David Thompson" },
    { id: "PAT005", name: "Lisa Anderson" }
  ];

  const metricsData = [
    {
      title: "Today\'s Patients",
      value: "12",
      subtitle: "6 completed",
      icon: "Users",
      trend: "up",
      trendValue: "+2"
    },
    {
      title: "Avg Consultation",
      value: "38m",
      subtitle: "Per patient",
      icon: "Clock",
      trend: "down",
      trendValue: "-5m"
    },
    {
      title: "Pending Tasks",
      value: "8",
      subtitle: "4 urgent",
      icon: "CheckCircle",
      trend: null,
      trendValue: null
    },
    {
      title: "Satisfaction Rate",
      value: "4.8",
      subtitle: "Based on 45 reviews",
      icon: "Star",
      trend: "up",
      trendValue: "+0.2"
    }
  ];

  useEffect(() => {
    const urgentCase = {
      id: "URGENT001",
      title: "Emergency Case Alert",
      message: "David Thompson (42M) requires immediate attention - severe chest pain and shortness of breath. Scheduled for 11:15 AM.",
      priority: "critical",
      time: "5 min ago"
    };
    setUrgentNotification(urgentCase);
  }, []);

  const handleViewRecord = (appointmentId) => {
    console.log('Viewing record for appointment:', appointmentId);
  };

  const handleCreatePrescription = (appointmentId) => {
    navigate('/prescription-management');
  };

  const handleStartConsultation = (appointmentId) => {
    console.log('Starting teleconsultation for appointment:', appointmentId);
  };

  const handleCompleteTask = (taskId) => {
    console.log('Completing task:', taskId);
  };

  const handlePatientSelect = (patient) => {
    console.log('Selected patient:', patient);
  };

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  };

  const handleDismissNotification = () => {
    setUrgentNotification(null);
  };

  const handleViewNotificationDetails = () => {
    console.log('Viewing notification details');
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader userRole="doctor" userName="Dr. Smith" />
      <div className="flex pt-[72px]">
        <DashboardNavigation
          userRole="doctor"
          isCollapsed={isNavCollapsed}
          onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)}
        />

        <main
          className={`flex-1 transition-smooth ${
            isNavCollapsed ? 'lg:ml-[80px]' : 'lg:ml-[280px]'
          }`}
        >
          <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Doctor Dashboard
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Welcome back, Dr. Smith. You have 6 appointments scheduled for today.
              </p>
            </div>

            {urgentNotification && (
              <div className="mb-6">
                <UrgentNotificationBanner
                  notification={urgentNotification}
                  onDismiss={handleDismissNotification}
                  onViewDetails={handleViewNotificationDetails}
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mb-6 md:mb-8">
              {metricsData?.map((metric, index) => (
                <MetricsCard key={index} {...metric} />
              ))}
            </div>

            <div className="mb-6">
              <PatientSearchBar
                recentPatients={recentPatients}
                onPatientSelect={handlePatientSelect}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-card border border-border rounded-xl p-4 md:p-5 lg:p-6">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div>
                      <h2 className="text-lg md:text-xl font-semibold text-foreground mb-1">
                        Today's Schedule
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {selectedDate?.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Calendar"
                      iconPosition="left"
                    >
                      Change Date
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {todayAppointments?.map((appointment) => (
                      <DailyScheduleCard
                        key={appointment?.id}
                        appointment={appointment}
                        onViewRecord={handleViewRecord}
                        onCreatePrescription={handleCreatePrescription}
                        onStartConsultation={handleStartConsultation}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-4 md:p-5 lg:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg md:text-xl font-semibold text-foreground">
                      Pending Tasks
                    </h2>
                    <span className="px-3 py-1 rounded-full bg-error/10 text-error text-xs md:text-sm font-medium">
                      {pendingTasks?.filter(t => t?.priority === 'urgent')?.length} Urgent
                    </span>
                  </div>

                  <div className="space-y-3">
                    {pendingTasks?.map((task) => (
                      <PendingTaskItem
                        key={task?.id}
                        task={task}
                        onComplete={handleCompleteTask}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="Plus"
                    iconPosition="left"
                    className="mt-4"
                  >
                    View All Tasks
                  </Button>
                </div>

                <CalendarSyncStatus
                  lastSync="2025-12-28T15:30:00"
                  isSyncing={isSyncing}
                  onManualSync={handleManualSync}
                />

                <div className="bg-card border border-border rounded-xl p-4 md:p-5 lg:p-6">
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconName="FileText"
                      iconPosition="left"
                      onClick={() => navigate('/prescription-management')}
                    >
                      Create Prescription
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconName="Calendar"
                      iconPosition="left"
                      onClick={() => navigate('/appointment-booking')}
                    >
                      Schedule Appointment
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconName="Users"
                      iconPosition="left"
                    >
                      View All Patients
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
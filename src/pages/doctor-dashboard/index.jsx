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
import PatientProfileModal from './components/PatientProfileModal';
import CreateTaskModal from './components/CreateTaskModal';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date('2025-12-28'));
  const [urgentNotification, setUrgentNotification] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showPatientsModal, setShowPatientsModal] = useState(false);
  const [showAllTasksModal, setShowAllTasksModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [selectedPatientProfile, setSelectedPatientProfile] = useState(null);

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

  const [pendingTasks, setPendingTasks] = useState([
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
  ]);

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
    setPendingTasks(prev => prev.filter(task => task.id !== taskId));

    // Also check if it matches the urgent notification
    if (urgentNotification?.id === taskId) {
      setUrgentNotification(null);
    }

    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
  };

  const handlePatientSelect = (patient) => {
    // Show full profile
    const fullProfile = [...todayAppointments, ...recentPatients].find(p => p.id === patient.id && p.age) || patient;
    setSelectedPatientProfile(fullProfile);
    setShowPatientsModal(false);
  };

  const handleAddTask = (newTask) => {
    setPendingTasks(prev => [newTask, ...prev]);
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
    if (urgentNotification) {
      setSelectedTask({
        ...urgentNotification,
        description: urgentNotification.message,
        dueTime: urgentNotification.time,
        type: 'emergency'
      });
    }
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
          className={`flex-1 transition-smooth ${isNavCollapsed ? 'lg:ml-[80px]' : 'lg:ml-[280px]'
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
                        onView={handleViewTask}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="List"
                    iconPosition="left"
                    className="mt-4"
                    onClick={() => setShowAllTasksModal(true)}
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
                      iconName="Users"
                      iconPosition="left"
                      onClick={() => setShowPatientsModal(true)}
                    >
                      View All Patients
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task Details Modal */}
          {selectedTask && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-card w-full max-w-md rounded-xl border border-border shadow-2xl p-6 animate-in fade-in zoom-in duration-200">
                <h3 className="text-xl font-bold mb-2">{selectedTask.title}</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</span>
                    <p className="text-foreground mt-1">{selectedTask.description}</p>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Priority</span>
                      <p className="text-foreground mt-1 capitalize">{selectedTask.priority}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Due Time</span>
                      <p className="text-foreground mt-1">{selectedTask.dueTime}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={() => setSelectedTask(null)}>Close</Button>
                    <Button onClick={() => handleCompleteTask(selectedTask.id)}>Finish Task</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Patients List Modal */}
          {showPatientsModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-card w-full max-w-2xl rounded-xl border border-border shadow-2xl p-6 animate-in fade-in zoom-in duration-200 max-h-[80vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">All Patients</h3>
                  <Button variant="ghost" size="sm" iconName="X" onClick={() => setShowPatientsModal(false)} />
                </div>
                <div className="overflow-y-auto flex-1 space-y-2 pr-2">
                  {/* Mocking a larger list by combining recentPatients and todayAppointments */}
                  {[...recentPatients, ...todayAppointments.map(a => ({ id: a.id, name: a.patientName }))].map((patient, i) => (
                    <div key={`${patient.id}-${i}`} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <span className="font-medium">{patient.name}</span>
                      <Button variant="ghost" size="sm" onClick={() => {
                        handlePatientSelect(patient);
                        setShowPatientsModal(false);
                      }}>View Profile</Button>
                    </div>
                  ))}
                  <div className="p-3 text-center text-muted-foreground text-sm">
                    Showing all active patients
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button variant="outline" onClick={() => setShowPatientsModal(false)}>Close</Button>
                </div>
              </div>
            </div>
          )}

          {/* All Tasks Modal */}
          {showAllTasksModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-card w-full max-w-2xl rounded-xl border border-border shadow-2xl p-6 animate-in fade-in zoom-in duration-200 max-h-[80vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">All Pending Tasks</h3>
                  <div className="flex gap-2">
                    <Button size="sm" iconName="Plus" iconPosition="left" onClick={() => setShowCreateTaskModal(true)}>Create Task</Button>
                    <Button variant="ghost" size="icon" iconName="X" onClick={() => setShowAllTasksModal(false)} />
                  </div>
                </div>
                <div className="overflow-y-auto flex-1 space-y-3 pr-2">
                  {pendingTasks.length > 0 ? pendingTasks.map((task) => (
                    <PendingTaskItem
                      key={task.id}
                      task={task}
                      onComplete={handleCompleteTask}
                      onView={handleViewTask}
                    />
                  )) : (
                    <div className="text-center py-10 text-muted-foreground">
                      No pending tasks. Great job!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <CreateTaskModal
            isOpen={showCreateTaskModal}
            onClose={() => setShowCreateTaskModal(false)}
            onSave={handleAddTask}
          />

          <PatientProfileModal
            patient={selectedPatientProfile}
            onClose={() => setSelectedPatientProfile(null)}
          />
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
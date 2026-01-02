import React, { useState } from 'react';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import DashboardNavigation from '../../components/ui/DashboardNavigation';
import MetricCard from './components/MetricCard';
import AppointmentChart from './components/AppointmentChart';
import ResourceUtilization from './components/ResourceUtilization';
import SystemMonitor from './components/SystemMonitor';
import StaffSchedule from './components/StaffSchedule';
import FinancialAnalytics from './components/FinancialAnalytics';
import CriticalAlerts from './components/CriticalAlerts';
import QuickActions from './components/QuickActions';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AdministratorDashboard = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  const keyMetrics = [
  {
    id: 1,
    title: "Total Appointments",
    value: "2,847",
    change: "+12.5%",
    changeType: "positive",
    icon: "Calendar",
    iconColor: "var(--color-primary)",
    trend: 85
  },
  {
    id: 2,
    title: "Patient Satisfaction",
    value: "94.2%",
    change: "+3.8%",
    changeType: "positive",
    icon: "Heart",
    iconColor: "var(--color-success)",
    trend: 94
  },
  {
    id: 3,
    title: "Resource Utilization",
    value: "78.5%",
    change: "+5.2%",
    changeType: "positive",
    icon: "Activity",
    iconColor: "var(--color-secondary)",
    trend: 78
  },
  {
    id: 4,
    title: "No-Show Rate",
    value: "4.3%",
    change: "-2.1%",
    changeType: "positive",
    icon: "UserX",
    iconColor: "var(--color-warning)",
    trend: 4
  }];


  const appointmentData = [
  { month: "Jul", scheduled: 820, completed: 765, cancelled: 55 },
  { month: "Aug", scheduled: 890, completed: 835, cancelled: 55 },
  { month: "Sep", scheduled: 950, completed: 895, cancelled: 55 },
  { month: "Oct", scheduled: 1020, completed: 965, cancelled: 55 },
  { month: "Nov", scheduled: 1100, completed: 1040, cancelled: 60 },
  { month: "Dec", scheduled: 1180, completed: 1115, cancelled: 65 }];


  const resources = [
  {
    id: 1,
    name: "Operating Rooms",
    icon: "Building",
    total: 12,
    available: 3,
    utilization: 75
  },
  {
    id: 2,
    name: "ICU Beds",
    icon: "Bed",
    total: 24,
    available: 2,
    utilization: 92
  },
  {
    id: 3,
    name: "General Beds",
    icon: "Home",
    total: 150,
    available: 35,
    utilization: 77
  },
  {
    id: 4,
    name: "Medical Equipment",
    icon: "Stethoscope",
    total: 85,
    available: 18,
    utilization: 79
  }];


  const systems = [
  {
    id: 1,
    name: "Patient Management System",
    description: "Core database and records",
    icon: "Database",
    status: "operational"
  },
  {
    id: 2,
    name: "Appointment Scheduler",
    description: "Booking and calendar sync",
    icon: "Calendar",
    status: "operational"
  },
  {
    id: 3,
    name: "Security & Authentication",
    description: "Access control and encryption",
    icon: "Shield",
    status: "warning"
  },
  {
    id: 4,
    name: "Data Synchronization",
    description: "Real-time data updates",
    icon: "RefreshCw",
    status: "operational"
  }];


  const staff = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiology",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b72c9492-1763295414491.png",
    avatarAlt: "Professional headshot of female doctor with blonde hair in white medical coat smiling warmly",
    schedule: "8:00 AM - 4:00 PM",
    status: "available",
    currentPatients: 12,
    maxPatients: 15,
    patientLoad: 80
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Neurology",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16b208b03-1763300936969.png",
    avatarAlt: "Professional headshot of Asian male doctor with short black hair in navy blue medical scrubs",
    schedule: "9:00 AM - 5:00 PM",
    status: "busy",
    currentPatients: 18,
    maxPatients: 20,
    patientLoad: 90
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialization: "Pediatrics",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10bc59f67-1763298553543.png",
    avatarAlt: "Professional headshot of Hispanic female doctor with long brown hair in white medical coat with stethoscope",
    schedule: "7:00 AM - 3:00 PM",
    status: "available",
    currentPatients: 10,
    maxPatients: 18,
    patientLoad: 56
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialization: "Orthopedics",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f147df5d-1763301649610.png",
    avatarAlt: "Professional headshot of African American male doctor with short hair in green medical scrubs smiling confidently",
    schedule: "10:00 AM - 6:00 PM",
    status: "available",
    currentPatients: 14,
    maxPatients: 16,
    patientLoad: 88
  }];


  const financialData = [
  { month: "Jul", revenue: 285000, costs: 195000, profit: 90000 },
  { month: "Aug", revenue: 310000, costs: 205000, profit: 105000 },
  { month: "Sep", revenue: 335000, costs: 215000, profit: 120000 },
  { month: "Oct", revenue: 360000, costs: 225000, profit: 135000 },
  { month: "Nov", revenue: 385000, costs: 235000, profit: 150000 },
  { month: "Dec", revenue: 410000, costs: 245000, profit: 165000 }];


  const financialSummary = [
  {
    id: 1,
    label: "Total Revenue",
    value: "$410K",
    change: "+15.2%",
    trend: "up",
    icon: "DollarSign",
    color: "var(--color-success)"
  },
  {
    id: 2,
    label: "Operating Costs",
    value: "$245K",
    change: "+8.5%",
    trend: "up",
    icon: "TrendingUp",
    color: "var(--color-warning)"
  },
  {
    id: 3,
    label: "Net Profit",
    value: "$165K",
    change: "+22.3%",
    trend: "up",
    icon: "PieChart",
    color: "var(--color-primary)"
  }];


  const alerts = [
  {
    id: 1,
    severity: "critical",
    title: "ICU Capacity Critical",
    description: "ICU beds at 92% capacity. Immediate action required to manage patient overflow and ensure emergency readiness.",
    time: "15 mins ago"
  },
  {
    id: 2,
    severity: "high",
    title: "Security Authentication Warning",
    description: "Multiple failed login attempts detected from unusual IP addresses. Security team has been notified for investigation.",
    time: "1 hour ago"
  },
  {
    id: 3,
    severity: "medium",
    title: "Equipment Maintenance Due",
    description: "12 medical equipment units require scheduled maintenance within the next 48 hours to ensure operational compliance.",
    time: "3 hours ago"
  }];


  const quickActions = [
  {
    id: 1,
    title: "User Management",
    description: "Add, edit, or remove user accounts and permissions",
    icon: "Users",
    color: "var(--color-primary)"
  },
  {
    id: 2,
    title: "Generate Reports",
    description: "Create custom analytics and operational reports",
    icon: "FileText",
    color: "var(--color-secondary)"
  },
  {
    id: 3,
    title: "System Settings",
    description: "Configure system parameters and preferences",
    icon: "Settings",
    color: "var(--color-warning)"
  },
  {
    id: 4,
    title: "Audit Logs",
    description: "Review system activity and security logs",
    icon: "Shield",
    color: "var(--color-error)"
  },
  {
    id: 5,
    title: "Department Management",
    description: "Manage hospital departments and resources",
    icon: "Building",
    color: "var(--color-success)"
  },
  {
    id: 6,
    title: "Billing Overview",
    description: "View financial transactions and billing status",
    icon: "CreditCard",
    color: "var(--color-primary)"
  }];


  const tabs = [
  { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart' },
  { id: 'operations', label: 'Operations', icon: 'Activity' }];


  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader userRole="administrator" userName="Admin User" />
      <DashboardNavigation
        userRole="administrator"
        isCollapsed={isNavCollapsed}
        onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)} />

      <main
        className={`pt-[72px] transition-all duration-250 ${
        isNavCollapsed ? 'lg:pl-[80px]' : 'lg:pl-[280px]'}`
        }>

        <div className="p-4 md:p-6 lg:p-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Administrator Dashboard
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Comprehensive operational oversight and strategic analytics for healthcare facility optimization
            </p>
          </div>

          <div className="lg:hidden mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {tabs?.map((tab) =>
              <button
                key={tab?.id}
                onClick={() => setSelectedTab(tab?.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth flex-shrink-0 ${
                selectedTab === tab?.id ?
                'bg-primary text-primary-foreground' :
                'bg-card text-foreground hover:bg-muted'}`
                }>

                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                </button>
              )}
            </div>
          </div>

          {(selectedTab === 'overview' || window.innerWidth >= 1024) &&
          <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                {keyMetrics?.map((metric) =>
              <MetricCard key={metric?.id} {...metric} />
              )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                <AppointmentChart data={appointmentData} />
                <ResourceUtilization resources={resources} />
              </div>
            </>
          }

          {(selectedTab === 'analytics' || window.innerWidth >= 1024) &&
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <FinancialAnalytics data={financialData} summary={financialSummary} />
              <SystemMonitor systems={systems} />
            </div>
          }

          {(selectedTab === 'operations' || window.innerWidth >= 1024) &&
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <StaffSchedule staff={staff} />
              <CriticalAlerts alerts={alerts} />
            </div>
          }

          <QuickActions actions={quickActions} />

          <div className="mt-6 md:mt-8 p-4 md:p-6 bg-card rounded-xl border border-border">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
                  Need detailed reports?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Export comprehensive analytics and operational data for in-depth analysis
                </p>
              </div>
              <Button variant="default" iconName="Download" iconPosition="left">
                Export Reports
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default AdministratorDashboard;
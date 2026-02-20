import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const DashboardNavigation = ({ userRole = 'patient', isCollapsed = false, onToggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationSections = {
    patient: [
      {
        title: 'Main',
        items: [
          { path: '/patient-dashboard', label: 'Dashboard', icon: 'LayoutDashboard', description: 'Overview of your health' },
          { path: '/appointment-booking', label: 'Appointments', icon: 'Calendar', description: 'Book and manage appointments' },
          { path: '/prescription-management', label: 'Prescriptions', icon: 'FileText', description: 'View your prescriptions' }
        ]
      },
      {
        title: 'Health Records',
        items: [
          { path: '/medical-records', label: 'Medical Records', icon: 'FolderOpen', description: 'Access your health records' },
          { path: '/test-results', label: 'Test Results', icon: 'Activity', description: 'View lab results' }
        ]
      },
      {
        title: 'Support',
        items: [
          { path: '/ai-assistant', label: 'AI Assistant', icon: 'MessageCircle', description: 'Get instant help' },
          { path: '/help', label: 'Help Center', icon: 'HelpCircle', description: 'FAQs and support' }
        ]
      }
    ],
    doctor: [
      {
        title: 'Main',
        items: [
          { path: '/doctor-dashboard', label: 'Dashboard', icon: 'LayoutDashboard', description: 'Patient overview' },
          { path: '/prescription-management', label: 'Prescriptions', icon: 'FileText', description: 'Manage prescriptions' }
        ]
      },
      {
        title: 'Patient Management',
        items: [
          { path: '/patient-management', label: 'Patients', icon: 'Users', description: 'View all patients' },
          { path: '/appointments', label: 'Appointments', icon: 'Calendar', description: 'Manage schedule' },
          { path: '/consultations', label: 'Consultations', icon: 'Video', description: 'Virtual consultations' }
        ]
      },
      {
        title: 'Clinical Tools',
        items: [
          { path: '/clinical-tools', label: 'Calculators & Tools', icon: 'Tool', description: 'Clinical utilities' },
          { path: '/medical-records', label: 'Medical Records', icon: 'FolderOpen', description: 'Patient records' },
          { path: '/lab-orders', label: 'Lab Orders', icon: 'TestTube', description: 'Order tests' }
        ]
      }
    ],
    administrator: [
      {
        title: 'Main',
        items: [
          { path: '/administrator-dashboard', label: 'Dashboard', icon: 'LayoutDashboard', description: 'System overview' }
        ]
      },
      {
        title: 'Management',
        items: [
          { path: '/user-management', label: 'Users', icon: 'Users', description: 'Manage users' },
          { path: '/doctor-management', label: 'Doctors', icon: 'Stethoscope', description: 'Manage doctors' },
          { path: '/department-management', label: 'Departments', icon: 'Building', description: 'Manage departments' }
        ]
      },
      {
        title: 'Analytics',
        items: [
          { path: '/reports', label: 'Reports', icon: 'BarChart', description: 'View analytics' },
          { path: '/billing', label: 'Billing', icon: 'DollarSign', description: 'Financial overview' }
        ]
      },
      {
        title: 'System',
        items: [
          { path: '/settings', label: 'Settings', icon: 'Settings', description: 'System configuration' },
          { path: '/audit-logs', label: 'Audit Logs', icon: 'FileText', description: 'System activity' }
        ]
      }
    ]
  };

  const currentSections = navigationSections?.[userRole] || navigationSections?.patient;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-card shadow-elevation-2 hover:shadow-elevation-3 transition-smooth"
        aria-label="Toggle navigation menu"
      >
        <Icon name={isMobileOpen ? 'X' : 'Menu'} size={24} />
      </button>
      <aside
        className={`dashboard-navigation ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'open translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        <div className="dashboard-navigation-header">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-foreground font-heading">Navigation</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="hidden lg:flex"
            iconName={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
            iconSize={20}
          />
        </div>

        <div className="dashboard-navigation-content">
          {currentSections?.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              {!isCollapsed && (
                <h3 className="px-4 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider font-caption">
                  {section?.title}
                </h3>
              )}
              <nav className="space-y-1">
                {section?.items?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`dashboard-navigation-item ${isActivePath(item?.path) ? 'active' : ''
                      }`}
                    title={isCollapsed ? item?.label : item?.description}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span className="flex-1 text-left">{item?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </aside>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background z-[99] lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardNavigation;
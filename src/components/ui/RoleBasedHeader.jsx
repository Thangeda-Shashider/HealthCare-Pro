import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import NotificationCenter from './NotificationCenter';
import AccessibilityToolbar from './AccessibilityToolbar';

const RoleBasedHeader = ({ userRole = 'patient', userName = 'User' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = {
    patient: [
      { path: '/patient-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
      { path: '/appointment-booking', label: 'Book Appointment', icon: 'Calendar' },
      { path: '/prescription-management', label: 'Prescriptions', icon: 'FileText' }
    ],
    doctor: [
      { path: '/doctor-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
      { path: '/prescription-management', label: 'Prescriptions', icon: 'FileText' }
    ],
    administrator: [
      { path: '/administrator-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' }
    ]
  };

  const currentNavItems = navigationItems?.[userRole] || navigationItems?.patient;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="role-based-header">
        <div className="role-based-header-container">
          <div className="role-based-header-logo">
            <div className="role-based-header-logo-icon">
              <Icon name="Heart" size={28} color="var(--color-primary)" />
            </div>
            <span className="role-based-header-logo-text">HealthCare Pro</span>
          </div>

          <nav className="role-based-header-nav">
            {currentNavItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`role-based-header-nav-item ${isActivePath(item?.path) ? 'active' : ''}`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            ))}
          </nav>

          <div className="role-based-header-actions">
            <NotificationCenter userRole={userRole} />
            <AccessibilityToolbar />
            
            <div className="hidden lg:flex items-center gap-3 ml-4 pl-4 border-l border-border">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                iconName="LogOut"
                iconSize={20}
              />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="role-based-header-mobile-toggle"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden">
          <div 
            className="absolute inset-0 bg-background"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-[64px] left-0 right-0 bg-card border-b border-border shadow-elevation-3">
            <nav className="p-4 space-y-2">
              {currentNavItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </button>
              ))}
              
              <div className="pt-4 mt-4 border-t border-border">
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{userName}</p>
                    <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    iconName="LogOut"
                    iconSize={20}
                  />
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default RoleBasedHeader;
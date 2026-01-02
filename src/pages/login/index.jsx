import React, { useEffect } from 'react';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import WelcomeSection from './components/WelcomeSection';
import Icon from '../../components/AppIcon';

const Login = () => {
  useEffect(() => {
    document.title = 'Login - HealthCare Pro';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-start">
          <div className="order-2 lg:order-1">
            <WelcomeSection />
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-card border border-border rounded-2xl shadow-elevation-2 p-6 md:p-8 lg:p-10 sticky top-6">
              <div className="mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-3">
                  Welcome Back
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
                  Sign in to access your healthcare dashboard
                </p>
              </div>

              <LoginForm />

              <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-border">
                <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Icon name="Shield" size={16} color="var(--color-success)" />
                    <span className="text-xs md:text-sm text-muted-foreground">HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Lock" size={16} color="var(--color-primary)" />
                    <span className="text-xs md:text-sm text-muted-foreground">SSL Encrypted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="CheckCircle" size={16} color="var(--color-secondary)" />
                    <span className="text-xs md:text-sm text-muted-foreground">GDPR Certified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20">
          <TrustSignals />
        </div>

        <footer className="mt-12 md:mt-16 lg:mt-20 pt-8 md:pt-10 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <Icon name="Heart" size={20} color="var(--color-primary)" />
              <span className="text-sm md:text-base text-muted-foreground">
                © {new Date()?.getFullYear()} HealthCare Pro. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
              <button className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-smooth">
                Privacy Policy
              </button>
              <button className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-smooth">
                Terms of Service
              </button>
              <button className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-smooth">
                Contact Support
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;
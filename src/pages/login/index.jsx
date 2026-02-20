import React, { useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Icon from '../../components/AppIcon';

const Login = () => {
  useEffect(() => {
    document.title = 'Sign In - HealthCare Pro';
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 40%, #f0fdfa 100%)' }}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #0d9488, transparent)' }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #1e40af, transparent)' }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-center pt-8 pb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
            style={{ background: 'linear-gradient(135deg, #0d9488, #0891b2)' }}
          >
            <Icon name="Heart" size={20} color="white" />
          </div>
          <div>
            <span className="text-xl font-bold" style={{ color: '#0f172a' }}>HealthCare</span>
            <span className="text-xl font-bold" style={{ color: '#0d9488' }}> Pro</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card */}
          <div
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            style={{ boxShadow: '0 20px 60px rgba(13, 148, 136, 0.12), 0 4px 20px rgba(0,0,0,0.08)' }}
          >
            {/* Card top accent bar */}
            <div
              className="h-1 w-full"
              style={{ background: 'linear-gradient(90deg, #0d9488, #0891b2, #1d4ed8)' }}
            />

            <div className="px-8 pt-8 pb-10">
              {/* Heading */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-1" style={{ color: '#0f172a' }}>
                  Welcome Back
                </h1>
                <p className="text-sm" style={{ color: '#64748b' }}>
                  Sign in to your healthcare account
                </p>
              </div>

              {/* Login Form with role selection */}
              <LoginForm />
            </div>
          </div>

          {/* Trust badges
          <div className="flex items-center justify-center gap-5 mt-6 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Icon name="Shield" size={13} color="#0d9488" />
              <span className="text-xs" style={{ color: '#64748b' }}>HIPAA Compliant</span>
            </div>
            <div className="w-1 h-1 rounded-full" style={{ background: '#cbd5e1' }} aria-hidden="true" />
            <div className="flex items-center gap-1.5">
              <Icon name="Lock" size={13} color="#0891b2" />
              <span className="text-xs" style={{ color: '#64748b' }}>256-bit SSL</span>
            </div>
            <div className="w-1 h-1 rounded-full" style={{ background: '#cbd5e1' }} aria-hidden="true" />
            <div className="flex items-center gap-1.5">
              <Icon name="CheckCircle" size={13} color="#1d4ed8" />
              <span className="text-xs" style={{ color: '#64748b' }}>GDPR Certified</span>
            </div>
          </div> */}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center pb-6 pt-2">
        <p className="text-xs" style={{ color: '#94a3b8' }}>
          © {new Date().getFullYear()} HealthCare Pro ·
          <button className="ml-1 hover:underline" style={{ color: '#94a3b8' }}>Privacy</button> ·
          <button className="ml-1 hover:underline" style={{ color: '#94a3b8' }}>Terms</button>
        </p>
      </footer>
    </div>
  );
};

export default Login;
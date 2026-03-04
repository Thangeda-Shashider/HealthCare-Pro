import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

/* ─── Role definitions ──────────────────────────────────────────────── */
const ROLES = [
  {
    id: 'doctor',
    label: 'Doctor',
    icon: 'Stethoscope',
    description: 'Manage patients & schedules',
    accent: '#0d9488',
    accentLight: '#f0fdfa',
    accentBorder: '#99f6e4',
  },
  {
    id: 'patient',
    label: 'Patient',
    icon: 'User',
    description: 'View records & appointments',
    accent: '#0891b2',
    accentLight: '#f0f9ff',
    accentBorder: '#bae6fd',
  },
  {
    id: 'administrator',
    label: 'Admin',
    icon: 'Settings',
    description: 'Oversee hospital operations',
    accent: '#1d4ed8',
    accentLight: '#eff6ff',
    accentBorder: '#bfdbfe',
  },
];

const MOCK_CREDS = {
  patient: { email: 'patient@healthcare.com', password: 'Patient@123' },
  doctor: { email: 'doctor@healthcare.com', password: 'Doctor@123' },
  administrator: { email: 'admin@healthcare.com', password: 'Admin@123' },
};

const DASHBOARD_ROUTES = {
  patient: '/patient-dashboard',
  doctor: '/doctor-dashboard',
  administrator: '/administrator-dashboard',
};

/* ─── Component ─────────────────────────────────────────────────────── */
const LoginForm = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const selectedRoleData = ROLES.find((r) => r.id === selectedRole);

  /* ── Validation ── */
  const validate = () => {
    const errs = {};
    if (!selectedRole) errs.role = 'Please choose your role to continue';
    if (!email) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ── Submit ── */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setTimeout(() => {
      const creds = MOCK_CREDS[selectedRole];
      if (email === creds.email && password === creds.password) {
        navigate(DASHBOARD_ROUTES[selectedRole]);
      } else {
        setErrors({
          auth: `Invalid credentials. Use: ${creds.email} / ${creds.password}`,
        });
      }
      setIsLoading(false);
    }, 1400);
  };

  /* ── Helpers ── */
  const clearError = (field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const inputBase = {
    display: 'block',
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1.5px solid #e2e8f0',
    fontSize: '14px',
    color: '#0f172a',
    background: '#f8fafc',
    outline: 'none',
    transition: 'border-color 0.18s, box-shadow 0.18s',
  };

  const inputFocusStyle = (field) =>
    errors[field]
      ? { ...inputBase, borderColor: '#ef4444', background: '#fff7f7' }
      : inputBase;

  const accent = selectedRoleData?.accent || '#0d9488';

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* ── Step 1: Role Selection ── */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#94a3b8' }}>
          I am a
        </p>
        <div className="grid grid-cols-3 gap-2.5">
          {ROLES.map((role) => {
            const isSelected = selectedRole === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => {
                  setSelectedRole(role.id);
                  clearError('role');
                  clearError('auth');
                }}
                className="flex flex-col items-center gap-2 py-3.5 px-2 rounded-xl border-2 transition-all duration-200"
                style={{
                  borderColor: isSelected ? role.accent : '#e2e8f0',
                  background: isSelected ? role.accentLight : '#ffffff',
                  boxShadow: isSelected
                    ? `0 0 0 3px ${role.accent}22`
                    : 'none',
                  cursor: 'pointer',
                }}
                aria-pressed={isSelected}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: isSelected ? role.accent : '#f1f5f9',
                  }}
                >
                  <Icon
                    name={role.icon}
                    size={18}
                    color={isSelected ? '#ffffff' : '#94a3b8'}
                  />
                </div>
                <span
                  className="text-xs font-semibold leading-none"
                  style={{ color: isSelected ? role.accent : '#334155' }}
                >
                  {role.label}
                </span>
              </button>
            );
          })}
        </div>
        {errors.role && (
          <p className="mt-2 text-xs" style={{ color: '#ef4444' }}>
            {errors.role}
          </p>
        )}
        {selectedRoleData && (
          <p className="mt-2 text-xs text-center" style={{ color: '#94a3b8' }}>
            {selectedRoleData.description}
          </p>
        )}
      </div>

      {/* ── Step 2: Email ── */}
      <div className="mb-4">
        <label
          htmlFor="login-email"
          className="block text-sm font-medium mb-1.5"
          style={{ color: '#334155' }}
        >
          Email Address
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError('email');
            clearError('auth');
          }}
          style={inputFocusStyle('email')}
          onFocus={(e) => {
            e.target.style.borderColor = accent;
            e.target.style.boxShadow = `0 0 0 3px ${accent}22`;
            e.target.style.background = '#fff';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = errors.email ? '#ef4444' : '#e2e8f0';
            e.target.style.boxShadow = 'none';
            e.target.style.background = '#f8fafc';
          }}
        />
        {errors.email && (
          <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>
            {errors.email}
          </p>
        )}
      </div>

      {/* ── Step 3: Password ── */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="login-password"
            className="block text-sm font-medium"
            style={{ color: '#334155' }}
          >
            Password
          </label>
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-xs font-medium"
            style={{ color: accent }}
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearError('password');
              clearError('auth');
            }}
            style={{ ...inputFocusStyle('password'), paddingRight: '42px' }}
            onFocus={(e) => {
              e.target.style.borderColor = accent;
              e.target.style.boxShadow = `0 0 0 3px ${accent}22`;
              e.target.style.background = '#fff';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errors.password ? '#ef4444' : '#e2e8f0';
              e.target.style.boxShadow = 'none';
              e.target.style.background = '#f8fafc';
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            style={{ color: '#94a3b8' }}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={17} color="#94a3b8" />
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs" style={{ color: '#ef4444' }}>
            {errors.password}
          </p>
        )}
      </div>

      {/* ── Auth error ── */}
      {errors.auth && (
        <div
          className="mt-3 px-4 py-2.5 rounded-lg flex items-start gap-2"
          style={{ background: '#fef2f2', border: '1px solid #fecaca' }}
        >
          <Icon name="AlertCircle" size={15} color="#ef4444" />
          <p className="text-xs leading-relaxed" style={{ color: '#dc2626' }}>
            {errors.auth}
          </p>
        </div>
      )}

      {/* ── Submit ── */}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 w-full py-3 px-6 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
        style={{
          background: isLoading
            ? '#94a3b8'
            : `linear-gradient(135deg, ${accent}, ${accent}cc)`,
          boxShadow: isLoading ? 'none' : `0 4px 14px ${accent}44`,
          cursor: isLoading ? 'not-allowed' : 'pointer',
        }}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            Signing In…
          </>
        ) : (
          <>
            <Icon name="LogIn" size={16} color="white" />
            Sign In Securely
          </>
        )}
      </button>

      {/* ── Sign-up link ── */}
      <p className="text-center text-sm mt-5" style={{ color: '#64748b' }}>
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="font-semibold hover:underline"
          style={{ color: accent }}
        >
          Create one
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
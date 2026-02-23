import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

/* ─── Constants ─────────────────────────────────────────────────────── */
const ACCENT = '#0d9488';          // teal — primary brand colour
const ACCENT_LIGHT = '#f0fdfa';
const ACCENT_SHADOW = '#0d948844';
const ERROR_COLOR = '#ef4444';

/* ─── Helpers ───────────────────────────────────────────────────────── */
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/* ─── Component ─────────────────────────────────────────────────────── */
const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const [email, setEmail]         = useState('');
  const [error, setError]         = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent]           = useState(false);   // success state
  const [apiError, setApiError]   = useState('');      // network / server error

  /* ── Submit ── */
  const handleSubmit = (e) => {
    e.preventDefault();

    // client-side validation
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setApiError('');
    setIsLoading(true);

    // simulate network request
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes always succeeds; swap for real API call
      setSent(true);
    }, 1600);
  };

  const clearError = () => {
    if (error) setError('');
    if (apiError) setApiError('');
  };

  /* ── Shared input style ── */
  const inputBase = {
    display: 'block',
    width: '100%',
    padding: '11px 14px 11px 40px',
    borderRadius: '10px',
    border: `1.5px solid ${error ? ERROR_COLOR : '#e2e8f0'}`,
    fontSize: '14px',
    color: '#0f172a',
    background: error ? '#fff7f7' : '#f8fafc',
    outline: 'none',
    transition: 'border-color 0.18s, box-shadow 0.18s',
    boxSizing: 'border-box',
  };

  /* ════════════════════════════════════════════════════════════════════
     SUCCESS PANEL
  ════════════════════════════════════════════════════════════════════ */
  if (sent) {
    return (
      <div className="flex flex-col items-center text-center py-2">
        {/* Animated checkmark circle */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
          style={{
            background: ACCENT_LIGHT,
            boxShadow: `0 0 0 8px ${ACCENT}14`,
          }}
        >
          <Icon name="MailCheck" size={30} color={ACCENT} />
        </div>

        <h2 className="text-lg font-bold mb-2" style={{ color: '#0f172a' }}>
          Check your inbox
        </h2>
        <p className="text-sm leading-relaxed mb-1" style={{ color: '#64748b' }}>
          We've sent a password reset link to
        </p>
        <p className="text-sm font-semibold mb-5" style={{ color: ACCENT }}>
          {email}
        </p>
        <p className="text-xs leading-relaxed mb-6" style={{ color: '#94a3b8' }}>
          Didn't receive it? Check your spam folder or wait a minute and try again.
        </p>

        {/* Resend */}
        <button
          type="button"
          onClick={() => { setSent(false); setEmail(''); }}
          className="w-full py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 active:scale-95 mb-3"
          style={{
            borderColor: ACCENT,
            color: ACCENT,
            background: '#fff',
          }}
        >
          Resend email
        </button>

        {/* Back to login */}
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="text-sm font-medium flex items-center gap-1.5 transition-opacity hover:opacity-70"
          style={{ color: '#64748b' }}
        >
          <Icon name="ArrowLeft" size={14} color="#64748b" />
          Back to Sign In
        </button>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════════════
     MAIN FORM
  ════════════════════════════════════════════════════════════════════ */
  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Icon + heading */}
      <div className="flex flex-col items-center text-center mb-7">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
          style={{
            background: ACCENT_LIGHT,
            boxShadow: `0 0 0 6px ${ACCENT}12`,
          }}
        >
          <Icon name="KeyRound" size={26} color={ACCENT} />
        </div>
        <h1 className="text-2xl font-bold mb-1.5" style={{ color: '#0f172a' }}>
          Forgot your password?
        </h1>
        <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#64748b' }}>
          No worries — enter your registered email and we'll send you a secure reset link.
        </p>
      </div>

      {/* API / server error banner */}
      {apiError && (
        <div
          className="mb-4 px-4 py-3 rounded-xl flex items-start gap-2"
          style={{ background: '#fef2f2', border: '1px solid #fecaca' }}
        >
          <span className="flex-shrink-0 mt-0.5">
            <Icon name="AlertCircle" size={15} color={ERROR_COLOR} />
          </span>
          <p className="text-xs leading-relaxed" style={{ color: '#dc2626' }}>
            {apiError}
          </p>
        </div>
      )}

      {/* Email field */}
      <div className="mb-5">
        <label
          htmlFor="forgot-email"
          className="block text-sm font-medium mb-1.5"
          style={{ color: '#334155' }}
        >
          Email Address
        </label>
        <div className="relative">
          {/* Mail icon prefix */}
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon name="Mail" size={16} color={error ? ERROR_COLOR : '#94a3b8'} />
          </span>

          <input
            id="forgot-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError();
            }}
            style={inputBase}
            onFocus={(e) => {
              e.target.style.borderColor = ACCENT;
              e.target.style.boxShadow = `0 0 0 3px ${ACCENT_SHADOW}`;
              e.target.style.background = '#fff';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = error ? ERROR_COLOR : '#e2e8f0';
              e.target.style.boxShadow = 'none';
              e.target.style.background = error ? '#fff7f7' : '#f8fafc';
            }}
            aria-describedby={error ? 'forgot-email-error' : undefined}
            aria-invalid={!!error}
          />
        </div>

        {/* Inline field error */}
        {error && (
          <p
            id="forgot-email-error"
            className="mt-1.5 text-xs flex items-center gap-1"
            style={{ color: ERROR_COLOR }}
          >
            <Icon name="AlertCircle" size={12} color={ERROR_COLOR} />
            {error}
          </p>
        )}
      </div>

      {/* Security note */}
      <div
        className="flex items-start gap-2 px-3 py-2.5 rounded-xl mb-5"
        style={{ background: '#f0f9ff', border: '1px solid #bae6fd' }}
      >
        <span className="flex-shrink-0 mt-0.5">
          <Icon name="ShieldCheck" size={14} color="#0891b2" />
        </span>
        <p className="text-xs leading-relaxed" style={{ color: '#0369a1' }}>
          For security, the link expires in <strong>30 minutes</strong> and can only be used once.
        </p>
      </div>

      {/* Primary CTA */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-6 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
        style={{
          background: isLoading
            ? '#94a3b8'
            : `linear-gradient(135deg, ${ACCENT}, ${ACCENT}cc)`,
          boxShadow: isLoading ? 'none' : `0 4px 14px ${ACCENT_SHADOW}`,
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
            Sending Reset Link…
          </>
        ) : (
          <>
            <Icon name="Send" size={16} color="white" />
            Send Reset Link
          </>
        )}
      </button>

      {/* Back to login */}
      <div className="text-center mt-5">
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="text-sm font-medium inline-flex items-center gap-1.5 transition-opacity hover:opacity-70"
          style={{ color: '#64748b' }}
        >
          <Icon name="ArrowLeft" size={14} color="#64748b" />
          Back to Sign In
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;

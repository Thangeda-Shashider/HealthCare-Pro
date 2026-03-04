import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

/* ─── Role definitions (mirrors LoginForm) ─────────────────────────── */
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

/* ─── Password strength helper ─────────────────────────────────────── */
const getStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    const map = [
        { score: 1, label: 'Weak', color: '#ef4444' },
        { score: 2, label: 'Fair', color: '#f59e0b' },
        { score: 3, label: 'Good', color: '#0891b2' },
        { score: 4, label: 'Strong', color: '#0d9488' },
    ];
    return map[score - 1] || { score: 0, label: '', color: '' };
};

/* ─── Doctor-specific extra fields ─────────────────────────────────── */
const SPECIALIZATIONS = [
    'General Practitioner', 'Cardiologist', 'Neurologist', 'Orthopedic Surgeon',
    'Pediatrician', 'Dermatologist', 'Radiologist', 'Oncologist', 'Other',
];

/* ─── Component ─────────────────────────────────────────────────────── */
const SignupForm = () => {
    const navigate = useNavigate();

    /* Steps: 1 = role, 2 = personal info, 3 = account credentials */
    const [step, setStep] = useState(1);
    const [selectedRole, setSelectedRole] = useState('');

    /* Personal info */
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    /* Doctor-specific */
    const [licenseNumber, setLicenseNumber] = useState('');
    const [specialization, setSpecialization] = useState('');
    /* Patient-specific */
    const [dateOfBirth, setDateOfBirth] = useState('');
    /* Admin-specific */
    const [department, setDepartment] = useState('');

    /* Account credentials */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const selectedRoleData = ROLES.find((r) => r.id === selectedRole);
    const accent = selectedRoleData?.accent || '#0d9488';
    const strength = getStrength(password);

    /* ── Step 1 validation ── */
    const validateStep1 = () => {
        if (!selectedRole) {
            setErrors({ role: 'Please choose your role to continue' });
            return false;
        }
        setErrors({});
        return true;
    };

    /* ── Step 2 validation ── */
    const validateStep2 = () => {
        const errs = {};
        if (!firstName.trim()) errs.firstName = 'First name is required';
        if (!lastName.trim()) errs.lastName = 'Last name is required';
        if (phone && !/^\+?[0-9\s\-()]{7,15}$/.test(phone))
            errs.phone = 'Enter a valid phone number';
        if (selectedRole === 'doctor') {
            if (!licenseNumber.trim()) errs.licenseNumber = 'License number is required';
            if (!specialization) errs.specialization = 'Please select a specialization';
        }
        if (selectedRole === 'patient') {
            if (!dateOfBirth) errs.dateOfBirth = 'Date of birth is required';
        }
        if (selectedRole === 'administrator') {
            if (!department.trim()) errs.department = 'Department name is required';
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    /* ── Step 3 validation ── */
    const validateStep3 = () => {
        const errs = {};
        if (!email) {
            errs.email = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errs.email = 'Enter a valid email address';
        }
        if (!password) {
            errs.password = 'Password is required';
        } else if (password.length < 8) {
            errs.password = 'Password must be at least 8 characters';
        }
        if (!confirmPassword) {
            errs.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            errs.confirmPassword = 'Passwords do not match';
        }
        if (!agreedToTerms) errs.terms = 'You must agree to the terms to continue';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) setStep(2);
        if (step === 2 && validateStep2()) setStep(3);
    };

    const handleBack = () => {
        setErrors({});
        setStep((s) => s - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateStep3()) return;
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2200);
        }, 1600);
    };

    const clearError = (field) => {
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    /* ── Shared input styles ── */
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
        boxSizing: 'border-box',
    };

    const inputStyle = (field) =>
        errors[field]
            ? { ...inputBase, borderColor: '#ef4444', background: '#fff7f7' }
            : inputBase;

    const focusHandlers = (field) => ({
        onFocus: (e) => {
            e.target.style.borderColor = accent;
            e.target.style.boxShadow = `0 0 0 3px ${accent}22`;
            e.target.style.background = '#fff';
        },
        onBlur: (e) => {
            e.target.style.borderColor = errors[field] ? '#ef4444' : '#e2e8f0';
            e.target.style.boxShadow = 'none';
            e.target.style.background = '#f8fafc';
        },
    });

    const labelStyle = { color: '#334155', fontSize: '14px', fontWeight: '500', display: 'block', marginBottom: '6px' };
    const errorText = (field) =>
        errors[field] ? (
            <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors[field]}</p>
        ) : null;

    /* ── Step progress indicator ── */
    const steps = ['Role', 'Profile', 'Account'];

    /* ── Success screen ── */
    if (success) {
        return (
            <div className="flex flex-col items-center justify-center py-6 text-center">
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ background: `${accent}18` }}
                >
                    <Icon name="CheckCircle" size={32} color={accent} />
                </div>
                <h2 className="text-lg font-bold mb-1" style={{ color: '#0f172a' }}>
                    Account Created!
                </h2>
                <p className="text-sm mb-1" style={{ color: '#64748b' }}>
                    Welcome aboard,{' '}
                    <span style={{ color: accent, fontWeight: 600 }}>{firstName}</span>.<br />
                    Redirecting you to Sign In…
                </p>
                <div className="mt-4">
                    <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* ── Progress steps ── */}
            <div className="flex items-center justify-between mb-7">
                {steps.map((label, idx) => {
                    const num = idx + 1;
                    const isActive = step === num;
                    const isDone = step > num;
                    return (
                        <React.Fragment key={label}>
                            <div className="flex flex-col items-center gap-1">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200"
                                    style={{
                                        background: isDone ? accent : isActive ? accent : '#f1f5f9',
                                        color: isDone || isActive ? '#fff' : '#94a3b8',
                                        boxShadow: isActive ? `0 0 0 3px ${accent}30` : 'none',
                                    }}
                                >
                                    {isDone ? <Icon name="Check" size={13} color="#fff" /> : num}
                                </div>
                                <span className="text-xs font-medium" style={{ color: isActive || isDone ? accent : '#94a3b8' }}>
                                    {label}
                                </span>
                            </div>
                            {idx < steps.length - 1 && (
                                <div
                                    className="flex-1 h-0.5 mx-2 rounded-full transition-all duration-300"
                                    style={{ background: step > num ? accent : '#e2e8f0' }}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* ══════════════════════ STEP 1: ROLE ════════════════════════ */}
            {step === 1 && (
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#94a3b8' }}>
                        I am a
                    </p>
                    <div className="grid grid-cols-3 gap-2.5 mb-1">
                        {ROLES.map((role) => {
                            const isSelected = selectedRole === role.id;
                            return (
                                <button
                                    key={role.id}
                                    type="button"
                                    onClick={() => {
                                        setSelectedRole(role.id);
                                        clearError('role');
                                    }}
                                    className="flex flex-col items-center gap-2 py-4 px-2 rounded-xl border-2 transition-all duration-200"
                                    style={{
                                        borderColor: isSelected ? role.accent : '#e2e8f0',
                                        background: isSelected ? role.accentLight : '#ffffff',
                                        boxShadow: isSelected ? `0 0 0 3px ${role.accent}22` : 'none',
                                        cursor: 'pointer',
                                    }}
                                    aria-pressed={isSelected}
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                                        style={{ background: isSelected ? role.accent : '#f1f5f9' }}
                                    >
                                        <Icon name={role.icon} size={20} color={isSelected ? '#ffffff' : '#94a3b8'} />
                                    </div>
                                    <span
                                        className="text-xs font-semibold"
                                        style={{ color: isSelected ? role.accent : '#334155' }}
                                    >
                                        {role.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                    {selectedRoleData && (
                        <p className="text-xs text-center mt-2 mb-1" style={{ color: '#94a3b8' }}>
                            {selectedRoleData.description}
                        </p>
                    )}
                    {errorText('role')}

                    <button
                        type="button"
                        onClick={handleNext}
                        className="mt-6 w-full py-3 px-6 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
                        style={{
                            background: selectedRole
                                ? `linear-gradient(135deg, ${accent}, ${accent}cc)`
                                : '#e2e8f0',
                            color: selectedRole ? '#fff' : '#94a3b8',
                            boxShadow: selectedRole ? `0 4px 14px ${accent}44` : 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Continue
                        <Icon name="ArrowRight" size={16} color={selectedRole ? 'white' : '#94a3b8'} />
                    </button>
                </div>
            )}

            {/* ══════════════════════ STEP 2: PROFILE ════════════════════ */}
            {step === 2 && (
                <div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        {/* First Name */}
                        <div>
                            <label style={labelStyle}>First Name</label>
                            <input
                                type="text"
                                placeholder="Jane"
                                value={firstName}
                                autoComplete="given-name"
                                onChange={(e) => { setFirstName(e.target.value); clearError('firstName'); }}
                                style={inputStyle('firstName')}
                                {...focusHandlers('firstName')}
                            />
                            {errorText('firstName')}
                        </div>
                        {/* Last Name */}
                        <div>
                            <label style={labelStyle}>Last Name</label>
                            <input
                                type="text"
                                placeholder="Smith"
                                value={lastName}
                                autoComplete="family-name"
                                onChange={(e) => { setLastName(e.target.value); clearError('lastName'); }}
                                style={inputStyle('lastName')}
                                {...focusHandlers('lastName')}
                            />
                            {errorText('lastName')}
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="mb-4">
                        <label style={labelStyle}>
                            Phone Number <span style={{ color: '#94a3b8', fontWeight: 400 }}>(optional)</span>
                        </label>
                        <input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={phone}
                            autoComplete="tel"
                            onChange={(e) => { setPhone(e.target.value); clearError('phone'); }}
                            style={inputStyle('phone')}
                            {...focusHandlers('phone')}
                        />
                        {errorText('phone')}
                    </div>

                    {/* ── Doctor-specific ── */}
                    {selectedRole === 'doctor' && (
                        <>
                            <div className="mb-4">
                                <label style={labelStyle}>Medical License Number</label>
                                <input
                                    type="text"
                                    placeholder="e.g. MD-1234567"
                                    value={licenseNumber}
                                    onChange={(e) => { setLicenseNumber(e.target.value); clearError('licenseNumber'); }}
                                    style={inputStyle('licenseNumber')}
                                    {...focusHandlers('licenseNumber')}
                                />
                                {errorText('licenseNumber')}
                            </div>
                            <div className="mb-1">
                                <label style={labelStyle}>Specialization</label>
                                <select
                                    value={specialization}
                                    onChange={(e) => { setSpecialization(e.target.value); clearError('specialization'); }}
                                    style={{
                                        ...inputStyle('specialization'),
                                        appearance: 'none',
                                        cursor: 'pointer',
                                    }}
                                    {...focusHandlers('specialization')}
                                >
                                    <option value="">Select specialization…</option>
                                    {SPECIALIZATIONS.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                                {errorText('specialization')}
                            </div>
                        </>
                    )}

                    {/* ── Patient-specific ── */}
                    {selectedRole === 'patient' && (
                        <div className="mb-1">
                            <label style={labelStyle}>Date of Birth</label>
                            <input
                                type="date"
                                value={dateOfBirth}
                                onChange={(e) => { setDateOfBirth(e.target.value); clearError('dateOfBirth'); }}
                                style={inputStyle('dateOfBirth')}
                                max={new Date().toISOString().split('T')[0]}
                                {...focusHandlers('dateOfBirth')}
                            />
                            {errorText('dateOfBirth')}
                        </div>
                    )}

                    {/* ── Admin-specific ── */}
                    {selectedRole === 'administrator' && (
                        <div className="mb-1">
                            <label style={labelStyle}>Department</label>
                            <input
                                type="text"
                                placeholder="e.g. Hospital Administration"
                                value={department}
                                onChange={(e) => { setDepartment(e.target.value); clearError('department'); }}
                                style={inputStyle('department')}
                                {...focusHandlers('department')}
                            />
                            {errorText('department')}
                        </div>
                    )}

                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95"
                            style={{ background: '#f1f5f9', color: '#64748b', cursor: 'pointer' }}
                        >
                            <Icon name="ArrowLeft" size={15} color="#64748b" />
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            className="flex-[2] py-3 px-6 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
                            style={{
                                background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                                boxShadow: `0 4px 14px ${accent}44`,
                                cursor: 'pointer',
                            }}
                        >
                            Continue
                            <Icon name="ArrowRight" size={16} color="white" />
                        </button>
                    </div>
                </div>
            )}

            {/* ══════════════════════ STEP 3: ACCOUNT ════════════════════ */}
            {step === 3 && (
                <form onSubmit={handleSubmit} noValidate>
                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="signup-email" style={labelStyle}>Email Address</label>
                        <input
                            id="signup-email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
                            style={inputStyle('email')}
                            {...focusHandlers('email')}
                        />
                        {errorText('email')}
                    </div>

                    {/* Password */}
                    <div className="mb-1">
                        <label htmlFor="signup-password" style={labelStyle}>Password</label>
                        <div className="relative">
                            <input
                                id="signup-password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="new-password"
                                placeholder="Min. 8 characters"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); clearError('password'); }}
                                style={{ ...inputStyle('password'), paddingRight: '42px' }}
                                {...focusHandlers('password')}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={17} color="#94a3b8" />
                            </button>
                        </div>
                        {/* Strength meter */}
                        {password && (
                            <div className="mt-2">
                                <div className="flex gap-1 mb-1">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="flex-1 h-1 rounded-full transition-all duration-300"
                                            style={{
                                                background: i <= strength.score ? strength.color : '#e2e8f0',
                                            }}
                                        />
                                    ))}
                                </div>
                                {strength.label && (
                                    <p className="text-xs" style={{ color: strength.color }}>
                                        {strength.label} password
                                    </p>
                                )}
                            </div>
                        )}
                        {errorText('password')}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-4 mt-4">
                        <label htmlFor="signup-confirm" style={labelStyle}>Confirm Password</label>
                        <div className="relative">
                            <input
                                id="signup-confirm"
                                type={showConfirm ? 'text' : 'password'}
                                autoComplete="new-password"
                                placeholder="Re-enter password"
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value); clearError('confirmPassword'); }}
                                style={{ ...inputStyle('confirmPassword'), paddingRight: '42px' }}
                                {...focusHandlers('confirmPassword')}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded"
                                aria-label={showConfirm ? 'Hide' : 'Show'}
                            >
                                <Icon name={showConfirm ? 'EyeOff' : 'Eye'} size={17} color="#94a3b8" />
                            </button>
                        </div>
                        {/* Match indicator */}
                        {confirmPassword && (
                            <p className="text-xs mt-1.5" style={{ color: password === confirmPassword ? '#0d9488' : '#ef4444' }}>
                                {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                            </p>
                        )}
                        {errorText('confirmPassword')}
                    </div>

                    {/* Terms */}
                    <label className="flex items-start gap-2.5 cursor-pointer select-none mb-1">
                        <div className="relative mt-0.5 flex-shrink-0">
                            <input
                                type="checkbox"
                                checked={agreedToTerms}
                                onChange={(e) => { setAgreedToTerms(e.target.checked); clearError('terms'); }}
                                className="sr-only"
                            />
                            <div
                                className="w-4.5 h-4.5 rounded border-2 flex items-center justify-center transition-all duration-150"
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    borderColor: agreedToTerms ? accent : '#cbd5e1',
                                    background: agreedToTerms ? accent : '#fff',
                                }}
                            >
                                {agreedToTerms && <Icon name="Check" size={11} color="#fff" />}
                            </div>
                        </div>
                        <span className="text-xs leading-relaxed" style={{ color: '#64748b' }}>
                            I agree to the{' '}
                            <button type="button" className="font-medium underline" style={{ color: accent }}>
                                Terms of Service
                            </button>{' '}
                            and{' '}
                            <button type="button" className="font-medium underline" style={{ color: accent }}>
                                Privacy Policy
                            </button>
                        </span>
                    </label>
                    {errorText('terms')}

                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95"
                            style={{ background: '#f1f5f9', color: '#64748b', cursor: 'pointer' }}
                        >
                            <Icon name="ArrowLeft" size={15} color="#64748b" />
                            Back
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-[2] py-3 px-6 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
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
                                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                    </svg>
                                    Creating Account…
                                </>
                            ) : (
                                <>
                                    <Icon name="UserPlus" size={16} color="white" />
                                    Create Account
                                </>
                            )}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default SignupForm;

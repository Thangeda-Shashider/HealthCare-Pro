import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const roleOptions = [
    { value: 'patient', label: 'Patient', description: 'Access your health records and appointments' },
    { value: 'doctor', label: 'Doctor', description: 'Manage patient care and schedules' },
    { value: 'administrator', label: 'Administrator', description: 'Oversee hospital operations' }
  ];

  const mockCredentials = {
    patient: { email: 'patient@healthcare.com', password: 'Patient@123' },
    doctor: { email: 'doctor@healthcare.com', password: 'Doctor@123' },
    administrator: { email: 'admin@healthcare.com', password: 'Admin@123' }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData?.role) {
      newErrors.role = 'Please select your role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      const credentials = mockCredentials?.[formData?.role];
      
      if (formData?.email === credentials?.email && formData?.password === credentials?.password) {
        const dashboardRoutes = {
          patient: '/patient-dashboard',
          doctor: '/doctor-dashboard',
          administrator: '/administrator-dashboard'
        };
        navigate(dashboardRoutes?.[formData?.role]);
      } else {
        setErrors({
          email: 'Invalid credentials. Please check your email and password.',
          password: `Use ${credentials?.email} / ${credentials?.password} for ${formData?.role} login`
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 md:space-y-5 lg:space-y-6">
      <div>
        <Select
          label="I am a"
          placeholder="Select your role"
          description="Choose your account type to continue"
          options={roleOptions}
          value={formData?.role}
          onChange={(value) => handleChange('role', value)}
          error={errors?.role}
          required
          size="default"
        />
      </div>
      <div>
        <Input
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={(e) => handleChange('email', e?.target?.value)}
          error={errors?.email}
          required
          className="text-base md:text-lg"
        />
      </div>
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          label="Password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={(e) => handleChange('password', e?.target?.value)}
          error={errors?.password}
          required
          className="text-base md:text-lg"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[42px] p-2 hover:bg-muted rounded-lg transition-smooth"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} color="var(--color-muted-foreground)" />
        </button>
      </div>
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-sm md:text-base text-primary hover:text-primary/80 font-medium transition-smooth"
        >
          Forgot Password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        className="mt-6 md:mt-8 text-base md:text-lg"
      >
        Sign In Securely
      </Button>
      <div className="text-center pt-4 md:pt-6">
        <p className="text-sm md:text-base text-muted-foreground">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-primary hover:text-primary/80 font-medium transition-smooth"
          >
            Create Account
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import Icon from '../../components/AppIcon';

const Signup = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Create Account - HealthCare Pro';
    }, []);

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 40%, #f0fdfa 100%)' }}
        >
            {/* Subtle background orbs — mirrors login page */}
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

            {/* Main */}
            <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md">
                    {/* Card */}
                    <div
                        className="bg-white rounded-2xl shadow-xl overflow-hidden"
                        style={{ boxShadow: '0 20px 60px rgba(13, 148, 136, 0.12), 0 4px 20px rgba(0,0,0,0.08)' }}
                    >
                        {/* Top accent bar */}
                        <div
                            className="h-1 w-full"
                            style={{ background: 'linear-gradient(90deg, #0d9488, #0891b2, #1d4ed8)' }}
                        />

                        <div className="px-8 pt-8 pb-10">
                            {/* Heading */}
                            <div className="text-center mb-7">
                                <h1 className="text-2xl font-bold mb-1" style={{ color: '#0f172a' }}>
                                    Create Your Account
                                </h1>
                                <p className="text-sm" style={{ color: '#64748b' }}>
                                    Join HealthCare Pro in just a few steps
                                </p>
                            </div>

                            <SignupForm />

                            {/* Sign-in link */}
                            <p className="text-center text-sm mt-6" style={{ color: '#64748b' }}>
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => navigate('/login')}
                                    className="font-semibold hover:underline"
                                    style={{ color: '#0d9488' }}
                                >
                                    Sign In
                                </button>
                            </p>
                        </div>
                    </div>
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

export default Signup;

import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = () => {
  const features = [
    {
      id: 1,
      icon: 'Calendar',
      title: '24/7 Appointment Booking',
      description: 'Schedule appointments anytime, anywhere with our intelligent booking system'
    },
    {
      id: 2,
      icon: 'FileText',
      title: 'Digital Medical Records',
      description: 'Access your complete health history securely from any device'
    },
    {
      id: 3,
      icon: 'MessageCircle',
      title: 'AI Health Assistant',
      description: 'Get instant answers to your health questions with our smart chatbot'
    },
    {
      id: 4,
      icon: 'Video',
      title: 'Teleconsultation',
      description: 'Connect with doctors remotely for convenient virtual consultations'
    }
  ];

  return (
    <div className="w-full">
      <div className="mb-8 md:mb-10 lg:mb-12">
        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Icon name="Heart" size={32} color="var(--color-primary)" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              HealthCare Pro
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
              Your Complete Healthcare Management Platform
            </p>
          </div>
        </div>

        <p className="text-base md:text-lg lg:text-xl text-foreground leading-relaxed">
          Welcome to the future of healthcare management. Access your medical records, book appointments, and connect with healthcare professionals—all in one secure platform designed for simplicity and accessibility.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
        {features?.map((feature) => (
          <div
            key={feature?.id}
            className="bg-card border border-border rounded-xl p-4 md:p-5 lg:p-6 hover:shadow-elevation-2 transition-smooth"
          >
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={20} color="var(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base lg:text-lg font-semibold text-foreground mb-1 md:mb-2">
                  {feature?.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 md:mt-10 lg:mt-12 p-4 md:p-5 lg:p-6 bg-success/5 border border-success/20 rounded-xl">
        <div className="flex items-start gap-3 md:gap-4">
          <Icon name="Sparkles" size={24} color="var(--color-success)" className="flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">
              Designed for Everyone
            </h4>
            <p className="text-sm md:text-base text-muted-foreground">
              Our platform is specifically designed with elderly and non-tech-savvy users in mind. Large buttons, clear labels, and intuitive navigation make healthcare management accessible to all.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
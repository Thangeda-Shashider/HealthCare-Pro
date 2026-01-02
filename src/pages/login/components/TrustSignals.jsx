import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      id: 1,
      icon: 'Shield',
      title: 'HIPAA Compliant',
      description: 'Your health data is protected under federal law',
      color: 'var(--color-success)'
    },
    {
      id: 2,
      icon: 'Lock',
      title: 'SSL Encrypted',
      description: '256-bit encryption for all data transmission',
      color: 'var(--color-primary)'
    },
    {
      id: 3,
      icon: 'CheckCircle',
      title: 'GDPR Certified',
      description: 'Compliant with global privacy standards',
      color: 'var(--color-secondary)'
    }
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-6 md:mb-8 lg:mb-10">
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2 md:mb-3">
          Your Security is Our Priority
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          Enterprise-grade security protecting your healthcare data
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
        {trustBadges?.map((badge) => (
          <div
            key={badge?.id}
            className="bg-card border border-border rounded-xl p-4 md:p-5 lg:p-6 hover:shadow-elevation-2 transition-smooth"
          >
            <div className="flex flex-col items-center text-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-muted flex items-center justify-center">
                <Icon name={badge?.icon} size={24} color={badge?.color} />
              </div>
              <div>
                <h4 className="text-sm md:text-base lg:text-lg font-semibold text-foreground mb-1 md:mb-2">
                  {badge?.title}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {badge?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 md:mt-8 lg:mt-10 p-4 md:p-5 lg:p-6 bg-primary/5 border border-primary/20 rounded-xl">
        <div className="flex items-start gap-3 md:gap-4">
          <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm md:text-base text-foreground font-medium mb-1">
              Secure Authentication
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              All login attempts are monitored and logged. Your account is protected with multi-factor authentication options and automatic session timeout for enhanced security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;
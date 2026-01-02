import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, steps }) => {
  return (
    <div className="bg-card rounded-xl shadow-elevation-2 p-4 md:p-6 mb-4 md:mb-6">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex flex-col items-center gap-2 flex-1">
              <div
                className={`
                  w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-smooth
                  ${currentStep > index
                    ? 'bg-success text-success-foreground'
                    : currentStep === index
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                  }
                `}
              >
                {currentStep > index ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name={step?.icon} size={20} />
                )}
              </div>
              <div className="text-center">
                <p className={`text-xs md:text-sm font-medium ${currentStep >= index ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step?.label}
                </p>
              </div>
            </div>
            {index < steps?.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 md:mx-4 mb-8">
                <div
                  className={`h-full transition-smooth ${
                    currentStep > index ? 'bg-success' : 'bg-muted'
                  }`}
                ></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
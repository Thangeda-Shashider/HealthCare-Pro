import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AccessibilityToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const toolbarRef = useRef(null);

  useEffect(() => {
    const savedFontSize = localStorage.getItem('accessibility-font-size');
    const savedHighContrast = localStorage.getItem('accessibility-high-contrast');
    const savedReducedMotion = localStorage.getItem('accessibility-reduced-motion');

    if (savedFontSize) setFontSize(parseInt(savedFontSize));
    if (savedHighContrast) setHighContrast(savedHighContrast === 'true');
    if (savedReducedMotion) setReducedMotion(savedReducedMotion === 'true');
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem('accessibility-font-size', fontSize?.toString());
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement?.classList?.add('high-contrast');
    } else {
      document.documentElement?.classList?.remove('high-contrast');
    }
    localStorage.setItem('accessibility-high-contrast', highContrast?.toString());
  }, [highContrast]);

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement?.classList?.add('reduce-motion');
    } else {
      document.documentElement?.classList?.remove('reduce-motion');
    }
    localStorage.setItem('accessibility-reduced-motion', reducedMotion?.toString());
  }, [reducedMotion]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolbarRef?.current && !toolbarRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleFontSizeChange = (direction) => {
    setFontSize(prev => {
      const newSize = direction === 'increase' ? prev + 10 : prev - 10;
      return Math.max(80, Math.min(140, newSize));
    });
  };

  const handleReset = () => {
    setFontSize(100);
    setHighContrast(false);
    setReducedMotion(false);
  };

  return (
    <div className="accessibility-toolbar" ref={toolbarRef}>
      {isOpen && (
        <div className="accessibility-toolbar-panel">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground mb-3 font-heading">
              Accessibility Options
            </h3>
          </div>

          <div className="accessibility-toolbar-option">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground mb-1">Text Size</p>
              <p className="text-xs text-muted-foreground font-caption">{fontSize}%</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFontSizeChange('decrease')}
                disabled={fontSize <= 80}
                iconName="Minus"
                iconSize={16}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFontSizeChange('increase')}
                disabled={fontSize >= 140}
                iconName="Plus"
                iconSize={16}
              />
            </div>
          </div>

          <div className="accessibility-toolbar-option">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground mb-1">High Contrast</p>
              <p className="text-xs text-muted-foreground font-caption">
                Enhance visual clarity
              </p>
            </div>
            <Button
              variant={highContrast ? 'default' : 'outline'}
              size="sm"
              onClick={() => setHighContrast(!highContrast)}
            >
              {highContrast ? 'On' : 'Off'}
            </Button>
          </div>

          <div className="accessibility-toolbar-option">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground mb-1">Reduce Motion</p>
              <p className="text-xs text-muted-foreground font-caption">
                Minimize animations
              </p>
            </div>
            <Button
              variant={reducedMotion ? 'default' : 'outline'}
              size="sm"
              onClick={() => setReducedMotion(!reducedMotion)}
            >
              {reducedMotion ? 'On' : 'Off'}
            </Button>
          </div>

          <div className="pt-3 mt-3 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              fullWidth
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="accessibility-toolbar-trigger"
        aria-label="Accessibility options"
      >
        <Icon name="Accessibility" size={24} />
      </button>
    </div>
  );
};

export default AccessibilityToolbar;
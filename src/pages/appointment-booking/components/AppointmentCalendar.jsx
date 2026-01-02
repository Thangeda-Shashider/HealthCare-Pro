import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AppointmentCalendar = ({ selectedDate, onDateSelect, availableSlots, onSlotSelect, selectedSlot }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 1));

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days?.push(new Date(year, month, i));
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date(2025, 11, 28);
    return date?.toDateString() === today?.toDateString();
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const isPastDate = (date) => {
    if (!date) return false;
    const today = new Date(2025, 11, 28);
    today?.setHours(0, 0, 0, 0);
    return date < today;
  };

  const getAvailabilityColor = (date) => {
    if (!date || isPastDate(date)) return '';
    const dateStr = date?.toISOString()?.split('T')?.[0];
    const slots = availableSlots?.[dateStr];
    if (!slots) return 'bg-muted';
    if (slots?.available > 10) return 'bg-success/20';
    if (slots?.available > 5) return 'bg-warning/20';
    return 'bg-error/20';
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const monthYear = currentMonth?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const getTimeSlots = () => {
    if (!selectedDate) return [];
    const dateStr = selectedDate?.toISOString()?.split('T')?.[0];
    return availableSlots?.[dateStr]?.slots || [];
  };

  const timeSlots = getTimeSlots();

  return (
    <div className="bg-card rounded-xl shadow-elevation-2 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-foreground font-heading">
          Select Date & Time
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevMonth}
            iconName="ChevronLeft"
            iconSize={20}
          />
          <span className="text-sm md:text-base font-medium text-foreground min-w-[140px] md:min-w-[160px] text-center">
            {monthYear}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextMonth}
            iconName="ChevronRight"
            iconSize={20}
          />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
        {weekDays?.map((day) => (
          <div
            key={day}
            className="text-center text-xs md:text-sm font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-6">
        {days?.map((date, index) => (
          <button
            key={index}
            onClick={() => date && !isPastDate(date) && onDateSelect(date)}
            disabled={!date || isPastDate(date)}
            className={`
              aspect-square rounded-lg text-sm md:text-base font-medium transition-smooth
              ${!date ? 'invisible' : ''}
              ${isPastDate(date) ? 'text-muted-foreground cursor-not-allowed opacity-40' : ''}
              ${isSelected(date) ? 'bg-primary text-primary-foreground shadow-elevation-2' : ''}
              ${!isSelected(date) && !isPastDate(date) ? `${getAvailabilityColor(date)} hover:shadow-elevation-1` : ''}
              ${isToday(date) && !isSelected(date) ? 'ring-2 ring-primary' : ''}
            `}
          >
            {date ? date?.getDate() : ''}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm mb-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-success/20"></div>
          <span className="text-muted-foreground">High Availability</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-warning/20"></div>
          <span className="text-muted-foreground">Limited Slots</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-error/20"></div>
          <span className="text-muted-foreground">Few Slots</span>
        </div>
      </div>
      {selectedDate && timeSlots?.length > 0 && (
        <div className="border-t border-border pt-6">
          <h4 className="text-base md:text-lg font-semibold text-foreground mb-4 font-heading">
            Available Time Slots
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
            {timeSlots?.map((slot) => (
              <button
                key={slot?.time}
                onClick={() => onSlotSelect(slot)}
                disabled={!slot?.available}
                className={`
                  p-3 md:p-4 rounded-lg text-sm md:text-base font-medium transition-smooth
                  ${!slot?.available ? 'bg-muted text-muted-foreground cursor-not-allowed' : ''}
                  ${slot?.available && selectedSlot?.time !== slot?.time ? 'bg-card border-2 border-border hover:border-primary hover:shadow-elevation-1' : ''}
                  ${selectedSlot?.time === slot?.time ? 'bg-primary text-primary-foreground shadow-elevation-2' : ''}
                `}
              >
                <div className="flex flex-col items-center gap-1">
                  <span>{slot?.time}</span>
                  {slot?.aiRecommended && (
                    <span className="flex items-center gap-1 text-xs text-success">
                      <Icon name="Sparkles" size={12} />
                      AI Pick
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;
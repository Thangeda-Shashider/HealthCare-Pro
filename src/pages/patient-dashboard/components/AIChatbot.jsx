import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hello! I'm your AI health assistant. I can help you with:\n• Symptom analysis\n• Appointment scheduling\n• Medication reminders\n• General health questions\n\nHow can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { id: 1, text: 'Book an appointment', icon: 'Calendar' },
    { id: 2, text: 'Check symptoms', icon: 'Activity' },
    { id: 3, text: 'View prescriptions', icon: 'FileText' },
    { id: 4, text: 'Emergency help', icon: 'AlertCircle' }
  ];

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage?.toLowerCase();
    
    if (lowerMessage?.includes('appointment') || lowerMessage?.includes('book')) {
      return "I can help you book an appointment. Please specify:\n• Preferred date and time\n• Type of consultation (General, Specialist, Follow-up)\n• Any specific doctor preference\n\nOr you can use the 'Book Appointment' button on your dashboard for a guided booking process.";
    } else if (lowerMessage?.includes('symptom') || lowerMessage?.includes('pain') || lowerMessage?.includes('fever')) {
      return "I understand you're experiencing symptoms. For accurate assessment:\n• Describe your symptoms in detail\n• Mention when they started\n• Rate severity (1-10)\n• List any medications you're taking\n\nNote: For severe symptoms or emergencies, please call 911 or visit the nearest emergency room immediately.";
    } else if (lowerMessage?.includes('prescription') || lowerMessage?.includes('medication')) {
      return "You can view all your prescriptions in the 'Prescriptions' section of your dashboard. This includes:\n• Active medications\n• Dosage instructions\n• Refill status\n• Pharmacy information\n\nWould you like me to guide you there?";
    } else if (lowerMessage?.includes('emergency') || lowerMessage?.includes('urgent')) {
      return "⚠️ For medical emergencies:\n• Call 911 immediately\n• Visit nearest emergency room\n• Contact your doctor directly\n\nFor urgent but non-emergency care, you can:\n• Book an urgent appointment\n• Use our teleconsultation service\n• Contact our 24/7 helpline: 1-800-HEALTH";
    } else {
      return "I'm here to help! You can ask me about:\n• Booking appointments\n• Understanding symptoms\n• Viewing medical records\n• Prescription information\n• General health questions\n\nPlease feel free to ask anything specific, or use the quick action buttons below.";
    }
  };

  const handleSendMessage = () => {
    if (!inputValue?.trim()) return;

    const userMessage = {
      id: messages?.length + 1,
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: messages?.length + 2,
        type: 'bot',
        text: getBotResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (actionText) => {
    setInputValue(actionText);
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-elevation-2 flex flex-col h-full">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="Bot" size={24} color="var(--color-primary)" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-semibold text-foreground">AI Health Assistant</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Always here to help</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
            <span className="text-xs text-success font-medium">Online</span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4" style={{ maxHeight: '400px' }}>
        {messages?.map((message) => (
          <div
            key={message?.id}
            className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[75%] rounded-xl p-3 md:p-4 ${
                message?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
              }`}
            >
              <p className="text-sm md:text-base whitespace-pre-line">{message?.text}</p>
              <p className={`text-xs mt-2 ${
                message?.type === 'user' ?'text-primary-foreground/70' :'text-muted-foreground'
              }`}>
                {formatTime(message?.timestamp)}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-xl p-4">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 md:p-6 border-t border-border space-y-3 md:space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={() => handleQuickAction(action?.text)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-smooth text-xs md:text-sm text-foreground"
            >
              <Icon name={action?.icon} size={16} />
              <span className="truncate">{action?.text}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e?.target?.value)}
            onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button
            variant="default"
            size="icon"
            onClick={handleSendMessage}
            disabled={!inputValue?.trim()}
            iconName="Send"
            iconSize={20}
          />
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
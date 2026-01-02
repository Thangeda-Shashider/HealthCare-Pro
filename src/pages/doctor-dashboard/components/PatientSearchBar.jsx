import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const PatientSearchBar = ({ recentPatients, onPatientSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredPatients = recentPatients?.filter(patient =>
    patient?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    patient?.id?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const handlePatientClick = (patient) => {
    onPatientSelect(patient);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search patient by name or ID..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e?.target?.value);
            setShowSuggestions(e?.target?.value?.length > 0);
          }}
          onFocus={() => setShowSuggestions(searchQuery?.length > 0)}
          className="pl-10"
        />
        <Icon
          name="Search"
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
      </div>
      {showSuggestions && filteredPatients?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-elevation-3 z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            <p className="px-3 py-2 text-xs text-muted-foreground font-caption uppercase tracking-wider">
              Search Results
            </p>
            {filteredPatients?.map((patient) => (
              <button
                key={patient?.id}
                onClick={() => handlePatientClick(patient)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-smooth text-left"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={18} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{patient?.name}</p>
                  <p className="text-xs text-muted-foreground">ID: {patient?.id}</p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}
      {showSuggestions && filteredPatients?.length === 0 && searchQuery?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-elevation-3 z-50 p-6 text-center">
          <Icon name="Search" size={32} className="mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No patients found</p>
        </div>
      )}
    </div>
  );
};

export default PatientSearchBar;
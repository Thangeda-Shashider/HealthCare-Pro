import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PrescriptionTable = ({ prescriptions, onEdit, onView, onRefill, userRole }) => {
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-success/10 text-success border-success/20',
      expiring: 'bg-warning/10 text-warning border-warning/20',
      expired: 'bg-error/10 text-error border-error/20',
      pending: 'bg-secondary/10 text-secondary border-secondary/20'
    };
    return colors?.[status] || colors?.active;
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedPrescriptions = [...prescriptions]?.sort((a, b) => {
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    if (sortField === 'date') {
      return multiplier * (new Date(a.date) - new Date(b.date));
    }
    return multiplier * a?.[sortField]?.localeCompare(b?.[sortField]);
  });

  return (
    <div className="bg-card rounded-xl border border-border shadow-elevation-1 overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('patientName')}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-smooth"
                >
                  Patient
                  <Icon name={sortField === 'patientName' ? (sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} size={16} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('medication')}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-smooth"
                >
                  Medication
                  <Icon name={sortField === 'medication' ? (sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} size={16} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Dosage</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Frequency</th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-smooth"
                >
                  Date
                  <Icon name={sortField === 'date' ? (sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} size={16} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Refills</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedPrescriptions?.map((prescription) => (
              <tr key={prescription?.id} className="hover:bg-muted/30 transition-smooth">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={prescription?.patientImage}
                      alt={prescription?.patientImageAlt}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{prescription?.patientName}</p>
                      <p className="text-xs text-muted-foreground font-caption">{prescription?.patientId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-foreground">{prescription?.medication}</p>
                  <p className="text-xs text-muted-foreground font-caption">{prescription?.genericName}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-foreground data-text">{prescription?.dosage}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-foreground">{prescription?.frequency}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-foreground data-text">{prescription?.date}</p>
                  <p className="text-xs text-muted-foreground font-caption">Expires: {prescription?.expiryDate}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-foreground data-text">{prescription?.refillsRemaining}/{prescription?.totalRefills}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(prescription?.status)}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {prescription?.status?.charAt(0)?.toUpperCase() + prescription?.status?.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onView(prescription)}
                      iconName="Eye"
                      iconSize={18}
                    />
                    {userRole === 'doctor' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(prescription)}
                        iconName="Edit"
                        iconSize={18}
                      />
                    )}
                    {prescription?.refillsRemaining > 0 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRefill(prescription)}
                        iconName="RefreshCw"
                        iconSize={18}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-border">
        {sortedPrescriptions?.map((prescription) => (
          <div key={prescription?.id} className="p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Image
                  src={prescription?.patientImage}
                  alt={prescription?.patientImageAlt}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{prescription?.patientName}</p>
                  <p className="text-xs text-muted-foreground font-caption">{prescription?.patientId}</p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(prescription?.status)}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                {prescription?.status?.charAt(0)?.toUpperCase() + prescription?.status?.slice(1)}
              </span>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium text-foreground">{prescription?.medication}</p>
                <p className="text-xs text-muted-foreground font-caption">{prescription?.genericName}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground font-caption">Dosage</p>
                  <p className="text-foreground font-medium data-text">{prescription?.dosage}</p>
                </div>
                <div>
                  <p className="text-muted-foreground font-caption">Frequency</p>
                  <p className="text-foreground font-medium">{prescription?.frequency}</p>
                </div>
                <div>
                  <p className="text-muted-foreground font-caption">Date</p>
                  <p className="text-foreground font-medium data-text">{prescription?.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground font-caption">Refills</p>
                  <p className="text-foreground font-medium data-text">{prescription?.refillsRemaining}/{prescription?.totalRefills}</p>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground font-caption">Expires: {prescription?.expiryDate}</p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(prescription)}
                iconName="Eye"
                iconPosition="left"
                iconSize={16}
                fullWidth
              >
                View
              </Button>
              {userRole === 'doctor' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(prescription)}
                  iconName="Edit"
                  iconPosition="left"
                  iconSize={16}
                  fullWidth
                >
                  Edit
                </Button>
              )}
              {prescription?.refillsRemaining > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRefill(prescription)}
                  iconName="RefreshCw"
                  iconPosition="left"
                  iconSize={16}
                  fullWidth
                >
                  Refill
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionTable;
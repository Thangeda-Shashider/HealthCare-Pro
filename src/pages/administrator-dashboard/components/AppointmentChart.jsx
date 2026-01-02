import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AppointmentChart = ({ data }) => {
  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-2 border border-border">
      <div className="mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Appointment Volume Trends</h3>
        <p className="text-sm text-muted-foreground">Monthly appointment statistics across departments</p>
      </div>

      <div className="w-full h-64 md:h-80 lg:h-96" aria-label="Monthly Appointment Volume Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px', fontFamily: 'Inter, sans-serif' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px', fontFamily: 'Inter, sans-serif' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '14px', fontFamily: 'Inter, sans-serif' }}
            />
            <Bar dataKey="scheduled" fill="var(--color-primary)" name="Scheduled" radius={[8, 8, 0, 0]} />
            <Bar dataKey="completed" fill="var(--color-success)" name="Completed" radius={[8, 8, 0, 0]} />
            <Bar dataKey="cancelled" fill="var(--color-error)" name="Cancelled" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AppointmentChart;
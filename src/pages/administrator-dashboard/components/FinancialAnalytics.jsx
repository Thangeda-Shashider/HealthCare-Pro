import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const FinancialAnalytics = ({ data, summary }) => {
  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-2 border border-border">
      <div className="mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">Financial Analytics</h3>
        <p className="text-sm text-muted-foreground">Revenue trends and operational efficiency metrics</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6">
        {summary?.map((item) => (
          <div key={item?.id} className="p-3 md:p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <Icon name={item?.icon} size={18} color={item?.color} />
              <p className="text-xs md:text-sm text-muted-foreground">{item?.label}</p>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground data-text">{item?.value}</p>
            <div className="flex items-center gap-1 mt-1">
              <Icon name={item?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} color={item?.trend === 'up' ? 'var(--color-success)' : 'var(--color-error)'} />
              <span className={`text-xs font-medium ${item?.trend === 'up' ? 'text-success' : 'text-error'}`}>
                {item?.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full h-64 md:h-80" aria-label="Revenue Trends Line Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
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
            <Line type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={2} name="Revenue" />
            <Line type="monotone" dataKey="costs" stroke="var(--color-error)" strokeWidth={2} name="Costs" />
            <Line type="monotone" dataKey="profit" stroke="var(--color-success)" strokeWidth={2} name="Profit" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinancialAnalytics;
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  color?: 'blue' | 'indigo' | 'purple' | 'emerald' | 'rose' | 'amber';
}

const colorStyles = {
  blue: 'bg-blue-50 text-blue-600 border-blue-100',
  indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  purple: 'bg-purple-50 text-purple-600 border-purple-100',
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  rose: 'bg-rose-50 text-rose-600 border-rose-100',
  amber: 'bg-amber-50 text-amber-600 border-amber-100',
};

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  color = 'blue' 
}) => {
  return (
    <div className="card card-hover flex flex-col justify-between">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-2xl border", colorStyles[color])}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={cn(
            "px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1",
            trend.isUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}>
            {trend.isUp ? '↑' : '↓'} {trend.value}%
          </div>
        )}
      </div>
      
      <div>
        <p className="text-sm font-bold text-slate-500 uppercase tracking-tight mb-1">{title}</p>
        <h3 className="text-3xl font-black text-slate-900">{value}</h3>
        {description && (
          <p className="text-sm text-slate-400 mt-2 font-medium">{description}</p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;

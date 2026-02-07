
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  Zap,
  Sparkles,
  Info,
  LayoutDashboard,
  Workflow,
  Lightbulb,
  Rocket
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/process', label: 'Process', icon: Workflow },
  { to: '/contribution', label: 'Weightage', icon: BarChart3 },
  { to: '/expected', label: 'Macro Fair Value', icon: TrendingUp },
  { to: '/vix-model', label: 'VIX Model', icon: Zap },
  { to: '/forecasts', label: 'Forecasts & Validation', icon: Sparkles },
  { to: '/usp', label: 'Project USP', icon: Lightbulb },
  { to: '/future', label: 'Future Extension', icon: Rocket },
];

const Navigation: React.FC = () => {
  return (
    <nav className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col p-4">
      <div className="flex items-center gap-2 px-2 py-4 mb-8">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <TrendingUp className="text-white w-5 h-5" />
        </div>
        <h1 className="font-bold text-xl tracking-tight text-slate-800">MacroSensex</h1>
      </div>

      <div className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
              ${isActive
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}
            `}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="mt-auto p-4 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex items-start gap-2 text-xs text-slate-500">
          <Info className="w-4 h-4 mt-0.5 text-slate-400" />
          <p>This is a macro research dashboard. Forecasts are fair-value estimates based on fundamental data.</p>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

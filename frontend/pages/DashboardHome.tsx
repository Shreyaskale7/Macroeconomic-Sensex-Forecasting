
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, TrendingUp, Zap, Target, Activity, CheckCircle2, Shield } from 'lucide-react';
import { fetchSummary } from '../services/backendService';
import { SummaryData } from '../types';

const DashboardHome: React.FC = () => {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary().then(data => {
      setSummary(data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const macroOutlook = summary?.macro_outlook || "Loading...";
  const riskBias = summary?.risk_bias || "Loading...";
  const currentLevel = summary?.current_level?.toLocaleString() || "---";
  const monthlyReturn = summary?.expected_monthly_return ? `${summary.expected_monthly_return}%` : "---";

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Sensex Intelligence Portal</h1>
          <p className="text-slate-500 mt-2 text-lg">Next-generation macroeconomic fair-value engine</p>
        </div>
        <div className="hidden md:flex items-center gap-3 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl border border-emerald-100">
          <Activity className="w-4 h-4" />
          <span className="text-sm font-bold">Model Status: {loading ? "Connecting..." : "Live Connected"}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickStat title="Current Market Level" value={currentLevel} change={monthlyReturn} trend={parseFloat(monthlyReturn) > 0 ? "up" : "down"} subtitle="Exp. Monthly Return" />
        <QuickStat title="Macro Outlook" value={macroOutlook} change="" trend="up" subtitle="Regime Signal" />
        <QuickStat title="VIX Sensitivity" value="Moderate" subtitle="15.2 Level" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all group">
          <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <BarChart3 className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold mb-3">Weightage Analysis</h2>
          <p className="text-slate-500 mb-6 leading-relaxed">Dissect the specific weight of GDP, inflation, and liquidity on the current fair-value estimate.</p>
          <Link to="/contribution" className="inline-flex items-center text-blue-600 font-bold hover:gap-3 transition-all">
            Explore Drivers <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
        </section>

        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all group">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold mb-3">Macro Fair Value</h2>
          <p className="text-slate-500 mb-6 leading-relaxed">Visualize market 'overheat' or 'underheat' by comparing actual prices with fundamental expectations.</p>
          <Link to="/expected" className="inline-flex items-center text-emerald-600 font-bold hover:gap-3 transition-all">
            Analyze Baseline <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
        </section>

        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all group">
          <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Target className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold mb-3">Multi-Horizon Forecast</h2>
          <p className="text-slate-500 mb-6 leading-relaxed">Advanced monthly trajectories for 6, 12, and 18-month windows based on macro-fundamental drift.</p>
          <Link to="/forecasts" className="inline-flex items-center text-purple-600 font-bold hover:gap-3 transition-all">
            View Projections <ArrowRight className="w-5 h-5 ml-1" />
          </Link>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 text-white rounded-3xl p-10 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Shield className="text-blue-400 w-6 h-6" />
              Scientific Foundation
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold">Structural Drift Modelling</h4>
                  <p className="text-slate-400 text-sm">Uses long-term GDP growth and corporate margin cycles to define the baseline.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold">VIX-Adaptive Refinement</h4>
                  <p className="text-slate-400 text-sm">Incorporates India VIX to adjust for fear-based deviations during crisis periods.</p>
                </div>
              </div>
            </div>
          </div>
          <Zap className="absolute -right-12 -bottom-12 w-80 h-80 text-white/5 pointer-events-none" />
        </div>

        {/* New Section: The Market Gap */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-3xl p-10 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4 text-indigo-900 flex items-center gap-2">
              <Activity className="w-6 h-6 text-indigo-600" />
              Bridging the Macro-Gap
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              While Algo-Trading models dominate the market with technical analysis on past price data, there is a critical void in <strong>Macroeconomic Trend Analyzers</strong> for the Sensex.
            </p>
            <div className="bg-white/60 rounded-xl p-4 border border-indigo-100 mb-4">
              <h4 className="font-bold text-indigo-900 text-sm mb-1">Traditional Algos</h4>
              <p className="text-xs text-slate-500">Focus on price patterns, volume, and momentum (Technical Analysis).</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-indigo-200 shadow-sm">
              <h4 className="font-bold text-indigo-900 text-sm mb-1">Our Macro Engine</h4>
              <p className="text-xs text-slate-600">Focuses on fundamental drivers: GDP, Inflation, Currency, and Liquidity.</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-10">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Market Outlook Summary</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            The model calculates a macro-implied monthly return of <strong>{monthlyReturn}</strong>,
            suggesting a <strong>{macroOutlook}</strong> regime.
            Current Sensex levels are analyzed against GST collections, IIP growth, and VIX volatility shocks.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Risk Bias</p>
              <p className="text-lg font-bold text-amber-600">{riskBias}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Fair Value Signal</p>
              <p className="text-lg font-bold text-emerald-600">Accumulate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const QuickStat = ({ title, value, change, trend, subtitle }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{title}</p>
    <div className="flex items-end justify-between mt-2">
      <span className="text-2xl font-black text-slate-900">{value}</span>
      {change && (
        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {change}
        </span>
      )}
      {subtitle && <span className="text-xs font-medium text-slate-500">{subtitle}</span>}
    </div>
  </div>
);

export default DashboardHome;

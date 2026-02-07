
import React, { useEffect, useState } from 'react';
import { fetchForecasts, fetchDetailedMonthlyForecasts } from '../services/backendService';
import { ForecastData, DetailedForecastData, Scenario } from '../types';
import { Calendar, TrendingUp, TrendingDown, Target, ShieldCheck } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ForecastPage: React.FC = () => {
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [detailedForecast, setDetailedForecast] = useState<DetailedForecastData | null>(null);
  const [scenario, setScenario] = useState<Scenario>('base');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchForecasts(scenario),
      fetchDetailedMonthlyForecasts(scenario)
    ]).then(([f, df]) => {
      setForecast(f);
      setDetailedForecast(df);
      setLoading(false);
    });
  }, [scenario]);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">🔮 Macro Projections</h1>
          <p className="text-slate-500 mt-1">Monthly fair-value paths from March 2025 across multiple horizons</p>
        </div>

        <div className="inline-flex bg-slate-100 p-1 rounded-xl self-start">
          {(['bear', 'base', 'bull'] as Scenario[]).map((s) => (
            <button
              key={s}
              onClick={() => setScenario(s)}
              className={`px-6 py-2 rounded-lg text-sm font-semibold capitalize transition-all
                ${scenario === s
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'}
              `}
            >
              {s}
            </button>
          ))}
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ForecastCard
              title="6-Month Target"
              value={forecast?.sixMonth ?? 0}
              subtitle="Projected for Sept 2025"
              color="border-blue-200"
              icon={<Calendar className="text-blue-600 w-5 h-5" />}
            />
            <ForecastCard
              title="12-Month Target"
              value={forecast?.twelveMonth ?? 0}
              subtitle="Projected for Mar 2026"
              color="border-purple-200"
              icon={<Target className="text-purple-600 w-5 h-5" />}
            />
            <ForecastCard
              title="18-Month Target"
              value={forecast?.eighteenMonth ?? 0}
              subtitle="Projected for Sept 2026"
              color="border-emerald-200"
              icon={<TrendingUp className="text-emerald-600 w-5 h-5" />}
            />
          </div>

          <div className="space-y-8">
            <h2 className="text-xl font-bold text-slate-800">Horizon Trajectories (Monthly)</h2>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <ProjectionChart
                title="6-Month Horizon (Mar '25 - Sep '25)"
                data={detailedForecast?.sixMonth ?? []}
                stroke="#2563eb"
              />
              <ProjectionChart
                title="12-Month Horizon (Mar '25 - Mar '26)"
                data={detailedForecast?.twelveMonth ?? []}
                stroke="#9333ea"
              />
              <ProjectionChart
                title="18-Month Horizon (Mar '25 - Sep '26)"
                data={detailedForecast?.eighteenMonth ?? []}
                stroke="#10b981"
              />
            </div>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Disclaimer & Use Case
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm">
              These are <strong>macro fair-value estimates</strong>, not trading targets or short-term price predictions.
              The model suggests where the Sensex <em>should</em> be based on GDP, inflation, and liquidity projections.
              Actual market prices may deviate significantly due to geopolitical events, retail sentiment, or technical flows.
            </p>
            <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Confidence Interval</p>
                <p className="text-lg font-bold">± 8.5%</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Update Frequency</p>
                <p className="text-lg font-bold">Monthly</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-slate-900">Scenario Definitions</h3>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
                <TrendingUp className="text-emerald-500 w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Bull Scenario</h4>
                <p className="text-xs text-slate-500">Accelerated GDP (7%+), low inflation, and aggressive corporate margin expansion.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
                <TrendingDown className="text-rose-500 w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Bear Scenario</h4>
                <p className="text-xs text-slate-500">Global recession risk, high crude oil prices, and rising domestic interest rates.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectionChart = ({ title, data, stroke }: { title: string, data: any[], stroke: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wider">{title}</h3>
    <div className="h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            interval={Math.ceil(data.length / 5)}
          />
          <YAxis
            hide
            domain={['dataMin - 1000', 'dataMax + 1000']}
          />
          <Tooltip
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
            formatter={(val: number) => [val.toLocaleString(), 'Fair Value']}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={stroke}
            strokeWidth={3}
            dot={{ r: 3, strokeWidth: 2, fill: '#fff' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const ForecastCard = ({ title, value, subtitle, color, icon }: any) => (
  <div className={`bg-white border-b-4 ${color} p-8 rounded-2xl shadow-sm hover:-translate-y-1 transition-all duration-300`}>
    <div className="flex justify-between items-start mb-4">
      <span className="p-2 bg-slate-50 rounded-lg">{icon}</span>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
    </div>
    <div className="mb-1">
      <span className="text-4xl font-black text-slate-900">{value.toLocaleString()}</span>
    </div>
    <p className="text-slate-500 text-sm font-medium">{subtitle}</p>
  </div>
);

export default ForecastPage;

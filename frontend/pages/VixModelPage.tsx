
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import { fetchVixAdjustedSensex } from '../services/backendService';
import { VixAdjustedData } from '../types';
import { Zap, AlertCircle } from 'lucide-react';

const VixModelPage: React.FC = () => {
  const [data, setData] = useState<VixAdjustedData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVixAdjustedSensex().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">⚡ Macro + Volatility (VIX) Model</h1>
          <p className="text-slate-500 mt-1">Monthly refined estimates adjusting for market fear and systemic risk</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-full border border-slate-200 text-sm font-medium text-slate-600">
          Source: sensex_with_vix_trial_2.py
        </div>
      </header>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[500px]">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="YEAR"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  interval={Math.ceil(data.length / 8)}
                />
                <YAxis
                  domain={['auto', 'auto']}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b' }}
                  tickFormatter={(val) => val.toLocaleString()}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [value.toLocaleString(), 'Points']}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Line
                  type="monotone"
                  dataKey="CLOSE_SENSEX"
                  name="Actual Sensex Closing"
                  stroke="#0f172a"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="stepAfter"
                  dataKey="EXPECTED_SENSEX_VIX"
                  name="VIX-Adjusted Fair Value"
                  stroke="#dc2626"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
            <h3 className="flex items-center gap-2 text-purple-900 font-bold mb-3">
              <Zap className="w-5 h-5" /> Monthly Volatility Sensitivity
            </h3>
            <p className="text-purple-800 text-sm leading-relaxed">
              By using a monthly frequency, the sensex_with_vix model can react faster to spikes in the India VIX. This prevents the "Fair Value" estimate from remaining static when systemic risk increases rapidly within a quarter.
            </p>
          </div>
        </div>
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
          <h3 className="flex items-center gap-2 text-amber-900 font-bold mb-3">
            <AlertCircle className="w-5 h-5" /> Real-Time Calibration
          </h3>
          <p className="text-amber-800 text-sm">
            Monthly tracking shows that the VIX-adjusted model historically stays within a tighter standard deviation of actual price than pure macro models.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VixModelPage;

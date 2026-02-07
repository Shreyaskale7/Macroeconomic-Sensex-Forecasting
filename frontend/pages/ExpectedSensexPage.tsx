
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchMacroExpectedSensex } from '../services/backendService';
import { ExpectedSensexData } from '../types';

const ExpectedSensexPage: React.FC = () => {
  const [data, setData] = useState<ExpectedSensexData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMacroExpectedSensex().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">📈 Macro Expected Sensex</h1>
          <p className="text-slate-500 mt-1">Monthly fundamental valuation vs. Actual market performance</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-full border border-slate-200 text-sm font-medium text-slate-600">
          Source: output.py
        </div>
      </header>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[500px]">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="EXPECTED_SENSEX"
                  name="Macro Fair Value"
                  stroke="#dc2626"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
          <h3 className="font-bold text-slate-800 mb-2">Monthly Fair Value Tracking</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Updated monthly data allows for more precise tracking of how short-term macro shocks (like interest rate hikes or IIP shifts) impact the underlying valuation baseline.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
          <h3 className="font-bold text-slate-800 mb-2">Historical Accuracy</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            The output.py model provides a 12-month smoothing of core economic indicators, offering a structural "anchor" that prevents overreacting to daily market volatility.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpectedSensexPage;

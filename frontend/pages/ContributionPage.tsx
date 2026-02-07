
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { fetchContributionAnalysis } from '../services/backendService';
import { ContributionData } from '../types';
import { Info, HelpCircle } from 'lucide-react';

const ContributionPage: React.FC = () => {
  const [data, setData] = useState<ContributionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContributionAnalysis().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { Feature, Contribution } = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg">
          <p className="font-bold text-slate-800">{Feature}</p>
          <p className={`${Contribution >= 0 ? 'text-emerald-600' : 'text-rose-600'} font-medium`}>
            Weightage: {Contribution > 0 ? '+' : ''}{Contribution}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">📊 Weightage Analysis</h1>
          <p className="text-slate-500 mt-1">Relative weight of macroeconomic factors on the Sensex valuation</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-full border border-slate-200 text-sm font-medium text-slate-600">
          Source: model3.py
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm min-h-[500px]">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={450}>
              <BarChart
                layout="vertical"
                data={data}
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="Feature"
                  type="category"
                  width={150}
                  tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Bar
                  dataKey="Contribution"
                  radius={[0, 4, 4, 0]}
                  barSize={24}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.Contribution >= 0 ? '#10b981' : '#f43f5e'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-blue-600 text-white p-6 rounded-2xl">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <HelpCircle className="w-5 h-5" /> What is "Weightage"?
            </h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Weightage measures how much each macro variable "pushed" the model's fair-value estimate.
              Positive values indicate tailwinds (growth factors), while negative values indicate headwinds (risk factors).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              Dynamic Indicators
            </h3>
            <div className="space-y-4">
              <div className="border-l-2 border-emerald-500 pl-3">
                <p className="text-xs font-bold text-emerald-600 uppercase">Primary Driver</p>
                <p className="text-sm font-semibold text-slate-800">GDP Momentum</p>
                <p className="text-xs text-slate-500">The core engine for corporate sales growth.</p>
              </div>
              <div className="border-l-2 border-rose-500 pl-3">
                <p className="text-xs font-bold text-rose-600 uppercase">Current Pressure</p>
                <p className="text-sm font-semibold text-slate-800">Inflation (CPI)</p>
                <p className="text-xs text-slate-500">Impacting purchasing power and raw material costs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InsightCard
          title="GDP Growth"
          desc="The 'Heartbeat' of Valuations. Stronger GDP leads to higher corporate earnings, justifying a higher price-to-earnings (P/E) multiple."
          type="positive"
        />
        <InsightCard
          title="Inflation (CPI)"
          desc="The Silent Margin Killer. High inflation leads to higher input costs for companies and potentially lower consumer spending."
          type="negative"
        />
        <InsightCard
          title="Interest Rates"
          desc="The Discounting Factor. Rising rates make future earnings less valuable today and increase corporate debt-servicing costs."
          type="neutral"
        />
        <InsightCard
          title="Foreign Reserves"
          desc="Currency Shield. Healthy reserves provide stability to the INR, attracting FII inflows and boosting market confidence."
          type="positive"
        />
        <InsightCard
          title="Corporate Earnings"
          desc="Fundamental Floor. Direct link to market performance; earnings growth is the most sustainable driver of long-term rallies."
          type="positive"
        />
        <InsightCard
          title="Exchange Rate"
          desc="Export Competitive Edge. A stable INR/USD is crucial for IT and Pharma sectors, which heavily contribute to Sensex earnings."
          type="neutral"
        />
      </div>
    </div>
  );
};

const InsightCard = ({ title, desc, type }: { title: string, desc: string, type: 'positive' | 'negative' | 'neutral' }) => {
  const colors = {
    positive: 'bg-emerald-50 border-emerald-100',
    negative: 'bg-rose-50 border-rose-100',
    neutral: 'bg-slate-50 border-slate-200'
  };

  return (
    <div className={`p-6 rounded-2xl border ${colors[type]} transition-transform hover:-translate-y-1`}>
      <h4 className="font-bold text-slate-800 mb-2">{title}</h4>
      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
};

export default ContributionPage;


import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GitMerge, Newspaper, Layers, RefreshCw, ZoomIn, Rocket } from 'lucide-react';

const FutureWorkPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <header className="mb-12">
                <Link to="/" className="inline-flex items-center text-slate-500 hover:text-slate-800 transition-colors mb-6">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
                </Link>
                <div className="flex items-center gap-3 mb-2">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border border-indigo-200">
                        Roadmap
                    </span>
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Future Extension</h1>
                <p className="text-slate-500 mt-2 text-lg max-w-3xl">
                    We are continuously evolving. Here is how we plan to expand the model's capabilities to deliver even sharper, granular, and faster insights.
                </p>
            </header>

            <div className="max-w-5xl mx-auto space-y-8 pb-20">

                {/* 1. Hybrid Macro-Technical Modeling */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all flex gap-6">
                    <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <GitMerge className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">1. Hybrid Macro-Technical Modeling</h3>
                        <p className="text-slate-600 leading-relaxed">
                            We plan to combine our "Big Picture" economic data with "Short Term" technical charts.
                            By integrating indicators like <strong>Moving Averages and Momentum</strong> along with the macro data, we can improve precision for short-term entry and exit points while keeping the long-term logic intact.
                        </p>
                    </div>
                </div>

                {/* 2. Sentiment and News Analytics Integration */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all flex gap-6">
                    <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Newspaper className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">2. Sentiment & News Analytics</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Numbers don't always capture panic or euphoria. We aim to integrate <strong>Natural Language Processing (NLP)</strong> to read financial news and global events in real-time.
                            This will help the model understand "Market Mood" and react to breaking news that hasn't hit the data sheets yet.
                        </p>
                    </div>
                </div>

                {/* 3. Stock-Level and Sector-Level Forecasting */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all flex gap-6">
                    <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Layers className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">3. Stock & Sector Deep Dives</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Moving beyond just the Sensex, we will adapt the model to forecast specific sectors like <strong>Banking, Energy, or Infra</strong>.
                            Eventually, we will drill down to individual stocks, using specific drivers (like credit growth for banks) to predict performance at a granular level.
                        </p>
                    </div>
                </div>

                {/* 4. Real-Time Data Pipeline and Automation */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all flex gap-6">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <RefreshCw className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">4. Real-Time Automation</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Currently, data is curated manually. Future versions will have <strong>automated pipelines</strong> that fetch live data directly from RBI, MOSPI, and Exchanges.
                            This ensures the dashboard is always up-to-the-minute without any manual intervention.
                        </p>
                    </div>
                </div>

                {/* 5. Enhanced Accuracy with More Parameters */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-all flex gap-6">
                    <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <ZoomIn className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">5. Continuous Accuracy Refinement</h3>
                        <p className="text-slate-600 leading-relaxed">
                            We are committed to making the model smarter. We will continuously test and integrate <strong>new economic parameters</strong>.
                            By constantly studying new correlations and data points, we will refine the mathematical formulas to minimize error margins and boost forecast reliability.
                        </p>
                    </div>
                </div>

                <div className="mt-12 bg-slate-900 rounded-3xl p-8 text-center text-white">
                    <Rocket className="w-12 h-12 mx-auto mb-4 text-indigo-400" />
                    <h3 className="text-2xl font-bold mb-2">Ready to see where we are today?</h3>
                    <p className="text-slate-400 mb-6">Explore our current live forecasts based on the existing robust model.</p>
                    <Link to="/forecasts" className="inline-block bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                        View Live Forecasts
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default FutureWorkPage;

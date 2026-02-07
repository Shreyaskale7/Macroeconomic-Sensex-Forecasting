
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Database, Filter, BrainCircuit, CheckCircle, TrendingUp } from 'lucide-react';

const ProcessPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <header className="mb-12">
                <Link to="/" className="inline-flex items-center text-slate-500 hover:text-slate-800 transition-colors mb-6">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
                </Link>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Model Development Lifecycle</h1>
                <p className="text-slate-500 mt-2 text-lg max-w-2xl">
                    A transparent view into the rigorous 5-step engineering process used to build the Sensex Macro Intelligence Engine.
                </p>
            </header>

            <div className="max-w-4xl mx-auto space-y-12 pb-20">

                {/* Step 1: Data Collection */}
                <section className="relative pl-12 border-l-2 border-slate-200">
                    <div className="absolute -left-6 top-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center border-4 border-slate-50">
                        <Database className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Data Collection</h2>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <p className="text-slate-600 leading-relaxed mb-4">
                            We aggregate raw macroeconomic indicators from authoritative sources including RBI, MOSPI, and global market feeds.
                            Key inputs include <strong>GST Collections, IIP Growth, Repo Rate, USD/INR, Crude prices, and FPI flows</strong>.
                            This raw lake constitutes the foundational truth for the model.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2 py-1">Tools & Sources:</span>
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">RBI Database</span>
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">MOSPI / PIB</span>
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">Investing.com</span>
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">Excel / CSV</span>
                        </div>
                    </div>
                </section>

                {/* Step 2: Data Sorting & Refining */}
                <section className="relative pl-12 border-l-2 border-slate-200">
                    <div className="absolute -left-6 top-0 w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center border-4 border-slate-50">
                        <Filter className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Data Sorting & Refining</h2>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Raw data is cleansed to handle missing values, outliers, and reporting lags.
                            We apply <strong>normalization techniques</strong> to make diverse units (percentages, currency values, index points) comparable.
                        </p>
                        <ul className="list-disc list-inside text-slate-500 space-y-1 text-sm bg-slate-50 p-4 rounded-xl mb-4">
                            <li>Lag alignment (handling release delays)</li>
                            <li>Outlier suppression using statistical thresholds</li>
                            <li>Calculated "Shock" variables (GST_SHOCK, VIX_SHOCK)</li>
                        </ul>
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2 py-1">Techniques:</span>
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">Python (Pandas)</span>
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">Linear Interpolation</span>
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">Lag Adjustment</span>
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">Normalization</span>
                        </div>
                    </div>
                </section>

                {/* Step 3: Data Analytics & Mapping */}
                <section className="relative pl-12 border-l-2 border-slate-200">
                    <div className="absolute -left-6 top-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center border-4 border-slate-50">
                        <BrainCircuit className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Analytics & Mapping</h2>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <p className="text-slate-600 leading-relaxed mb-4">
                            We employ a <strong>Regression-based Multi-Factor Model</strong> to map these refined inputs to Sensex movements.
                            The core engine calculates a "Bullish Probability" and an "Expected Monthly Return" based on the net impact of positive factors (e.g., rising GST) vs. negative headwinds (e.g., rising Crude).
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2 py-1">Modeling:</span>
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">Scikit-learn</span>
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">Logistic Regression</span>
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">Correlation Matrix</span>
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">Statistical Weighting</span>
                        </div>
                    </div>
                </section>

                {/* Step 4: Validation with Actual Sensex */}
                <section className="relative pl-12 border-l-2 border-slate-200">
                    <div className="absolute -left-6 top-0 w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center border-4 border-slate-50">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Validation</h2>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <p className="text-slate-600 leading-relaxed mb-4">
                            The model's theoretical output is rigorously backtested against actual historical Sensex data (2019–2025).
                            We verify the <strong>correlation and directional accuracy</strong>.
                        </p>
                        <div className="flex gap-3 mt-4 mb-4">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100">Historical Fit Verified</span>
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100">VIX Stress Tested</span>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2 py-1">Validation:</span>
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">Matplotlib (Viz)</span>
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">Backtesting</span>
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded">Directional Accuracy</span>
                        </div>
                    </div>
                </section>

                {/* Step 5: Prediction */}
                <section className="relative pl-12 border-l-2 border-slate-200">
                    <div className="hidden md:block absolute left-2 top-10 bottom-0 border-l-2 border-slate-200 border-dashed"></div>
                    <div className="absolute -left-6 top-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center border-4 border-slate-50">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Prediction & Deployment</h2>
                    <div className="bg-slate-900 p-8 rounded-3xl shadow-xl text-white">
                        <p className="text-slate-300 leading-relaxed mb-6">
                            Once validated, the active model projects future trajectories.
                            It generates <strong>6, 12, and 18-month forecasts</strong> with confidence intervals, creating the actionable intelligence visible on the dashboard.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-slate-700">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-2 py-1">Deployment:</span>
                            <span className="px-2 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded border border-slate-700">FastAPI (Backend)</span>
                            <span className="px-2 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded border border-slate-700">React + Vite</span>
                            <span className="px-2 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded border border-slate-700">Recharts</span>
                        </div>
                        <Link to="/forecasts" className="inline-flex bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                            View Live Forecasts
                        </Link>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default ProcessPage;

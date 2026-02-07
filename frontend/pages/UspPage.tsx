
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lightbulb, Scale, Calculator, BrainCircuit, Microscope } from 'lucide-react';

const UspPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12">
            <header className="mb-12">
                <Link to="/" className="inline-flex items-center text-slate-500 hover:text-slate-800 transition-colors mb-6">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
                </Link>
                <div className="flex items-center gap-3 mb-2">
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border border-amber-200">
                        Project Innovation
                    </span>
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Why This Model is Unique</h1>
                <p className="text-slate-500 mt-2 text-lg max-w-3xl">
                    Most forecasting tools are "black boxes." We built a transparent, logic-driven mathematical engine that focuses on <em>causality</em>, not just correlation.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pb-20">

                {/* USP 1: Logic vs AI */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Calculator className="w-32 h-32" />
                    </div>
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                        <Calculator className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Pure Mathematical Logic, Not AI</h3>
                    <p className="text-slate-600 leading-relaxed">
                        Unlike modern AI/ML models that act as "black boxes," this project relies on <strong>fundamental economic logic</strong>.
                        Every output is traceable to a specific mathematical determinant. We don't just predict <em>what</em> will happen; we demonstrate <em>why</em> it happens mathematically.
                    </p>
                </div>

                {/* USP 2: Multi-Factor Depth */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Scale className="w-32 h-32" />
                    </div>
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                        <Scale className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Comprehensive Parameter Space</h3>
                    <p className="text-slate-600 leading-relaxed">
                        Existing research in this domain typically isolates 1-2 variables (like GDP or Interest Rates).
                        Our model integrates a <strong>multi-dimensional matrix</strong> containing GST, IIP, FPI Flows, Exchange Rates, Commodities (Crude/Gold), and VIX, creating a holistic view of the economy.
                    </p>
                </div>

                {/* USP 3: Causality Focus */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Microscope className="w-32 h-32" />
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                        <Microscope className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Solving the "Research Gap"</h3>
                    <p className="text-slate-600 leading-relaxed">
                        Macro-market dependency analysis often remains theoretical. This project is a <strong>pioneering attempt</strong> to operationalize these theories into a working, real-time dashboard.
                        It bridges the gap between academic economic theory and practical market intelligence.
                    </p>
                </div>

                {/* USP 4: Deterministic Nature */}
                <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <BrainCircuit className="w-32 h-32" />
                    </div>
                    <div className="w-12 h-12 bg-white/10 text-white rounded-xl flex items-center justify-center mb-6">
                        <BrainCircuit className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Deterministic & Auditable</h3>
                    <p className="text-slate-300 leading-relaxed">
                        AI models hallucinate; Math does not. By avoiding neural networks in favor of <strong>statistical regression and deterministic calculus</strong>,
                        we ensure that the model is robust, auditable, and free from the "hidden biases" common in deep learning approaches.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default UspPage;

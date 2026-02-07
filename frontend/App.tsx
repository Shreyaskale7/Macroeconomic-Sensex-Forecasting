
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import DashboardHome from './pages/DashboardHome';
import ContributionPage from './pages/ContributionPage';
import ExpectedSensexPage from './pages/ExpectedSensexPage';
import VixModelPage from './pages/VixModelPage';
import ForecastPage from './pages/ForecastPage';
import ProcessPage from './pages/ProcessPage';
import UspPage from './pages/UspPage';
import FutureWorkPage from './pages/FutureWorkPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex min-h-screen">
        <Navigation />
        <main className="flex-1 p-8 lg:p-12 max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/contribution" element={<ContributionPage />} />
            <Route path="/expected" element={<ExpectedSensexPage />} />
            <Route path="/vix-model" element={<VixModelPage />} />
            <Route path="/forecasts" element={<ForecastPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/usp" element={<UspPage />} />
            <Route path="/future" element={<FutureWorkPage />} />
          </Routes>

          <footer className="mt-20 pt-8 border-t border-slate-200 flex justify-between items-center text-slate-400 text-sm">
            <p>&copy; 2025 MacroSensex Intelligence Platform. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="hover:text-slate-600 cursor-pointer">Methodology</span>
              <span className="hover:text-slate-600 cursor-pointer">API Docs</span>
              <span className="hover:text-slate-600 cursor-pointer">Privacy</span>
            </div>
          </footer>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;

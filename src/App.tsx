import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { ExecutiveHome } from './components/executive/ExecutiveHome';
import { ManagerHome } from './components/manager/ManagerHome';
import { ClientView } from './components/manager/ClientView';
import { CampaignView } from './components/manager/CampaignView';
import { AdGroupView, PackageView, DealView } from './components/manager/DeepDrillView';
import ArchitectureView from './components/views/ArchitectureView';

function AppInner() {
  const [mode, setMode] = useState('executive');
  const navigate = useNavigate();

  const handleModeChange = (newMode: string) => {
    setMode(newMode);
    navigate(newMode === 'executive' ? '/executive' : '/manager');
  };

  return (
    <div className="min-h-screen grain">
      <Header mode={mode} onModeChange={handleModeChange} />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 2xl:px-12 pt-2 pb-3">
        <p className="text-xs leading-relaxed max-w-3xl text-text-secondary">
          <span className="text-text-muted">Why I built this — </span>
          A retail media agency managing 8 clients across 23 campaigns had no way to see both the executive summary and deal-level detail in one system. I built a dual-mode dashboard — executives see KPI tiles, operators drill through 7 hierarchical levels.
        </p>
      </div>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/executive" replace />} />
          <Route path="/executive" element={<ExecutiveHome />} />
          <Route path="/manager" element={<ManagerHome />} />
          <Route path="/manager/:clientId" element={<ClientView />} />
          <Route path="/manager/:clientId/:campaignId" element={<CampaignView />} />
          <Route path="/manager/:clientId/:campaignId/:adGroupId" element={<AdGroupView />} />
          <Route path="/manager/:clientId/:campaignId/:adGroupId/:packageId" element={<PackageView />} />
          <Route path="/manager/:clientId/:campaignId/:adGroupId/:packageId/:dealId" element={<DealView />} />
          <Route path="/architecture" element={<ArchitectureView />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}

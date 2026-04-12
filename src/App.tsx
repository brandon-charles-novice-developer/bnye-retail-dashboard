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

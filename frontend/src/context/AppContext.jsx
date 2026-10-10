import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [activePage, setActivePage] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [contentItems, setContentItems] = useState([]);
  const [publishJobs, setPublishJobs] = useState([]);
  const [socialAccounts, setSocialAccounts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [sequences, setSequences] = useState([]);
  const [killSwitchActive, setKillSwitchActive] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedProductForStudio, setSelectedProductForStudio] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const refreshData = async () => {
    try {
      const [pRes, cRes, contRes, jobsRes, accRes, anRes, logsRes, subRes, seqRes] = await Promise.all([
        api.getProducts().catch(() => ({ data: [] })),
        api.getCampaigns().catch(() => ({ data: [] })),
        api.getContent().catch(() => ({ data: [] })),
        api.getPublishJobs().catch(() => ({ data: [] })),
        api.getSocialAccounts().catch(() => ({ data: [] })),
        api.getAnalytics().catch(() => null),
        api.getAuditLogs().catch(() => ({ data: [] })),
        api.getEmailSubscribers().catch(() => ({ data: [] })),
        api.getEmailSequences().catch(() => ({ data: [] }))
      ]);

      if (pRes?.success) setProducts(pRes.data);
      if (cRes?.success) setCampaigns(cRes.data);
      if (contRes?.success) setContentItems(contRes.data);
      if (jobsRes?.success) setPublishJobs(jobsRes.data);
      if (accRes?.success) setSocialAccounts(accRes.data);
      if (anRes?.success) {
        setAnalytics(anRes.data);
        setKillSwitchActive(Boolean(anRes.data.overview?.emergencyKillSwitch));
      }
      if (logsRes?.success) setAuditLogs(logsRes.data);
      if (subRes?.success) setSubscribers(subRes.data);
      if (seqRes?.success) setSequences(seqRes.data);
    } catch (err) {
      console.error('Data refresh error:', err);
    }
  };

  useEffect(() => {
    refreshData();
    const timer = setInterval(refreshData, 12000);
    return () => clearInterval(timer);
  }, []);

  const pendingApprovalsCount = contentItems.filter(
    c => c.approvalStatus === 'awaiting_approval' || c.approvalStatus === 'pending_approval'
  ).length;

  return (
    <AppContext.Provider value={{
      activePage,
      setActivePage,
      products,
      campaigns,
      contentItems,
      publishJobs,
      socialAccounts,
      analytics,
      auditLogs,
      subscribers,
      sequences,
      killSwitchActive,
      setKillSwitchActive,
      toast,
      showToast,
      refreshData,
      selectedProductForStudio,
      setSelectedProductForStudio,
      pendingApprovalsCount
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

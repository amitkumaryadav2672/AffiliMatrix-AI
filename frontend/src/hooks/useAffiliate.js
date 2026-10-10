import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export function useAffiliate() {
  const context = useApp();
  const { showToast, refreshData, setKillSwitchActive } = context;

  const generateContent = async ({ productId, angle, tone }) => {
    try {
      const res = await api.generateContent({ productId, angle, tone });
      if (res.success) {
        showToast(`AI synthesized multi-platform package (FTC Score: ${res.data.complianceScore}/100)`);
        await refreshData();
        return res.data;
      }
      throw new Error(res.message);
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const approveAndSchedule = async (contentId, platforms) => {
    try {
      await api.updateContentStatus(contentId, 'approved');
      const res = await api.scheduleContent(contentId, platforms);
      if (res.success) {
        showToast(`Approved! Queued publishing across ${platforms.length} social platforms.`);
        await refreshData();
        return res.data;
      }
      throw new Error(res.message);
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const rejectContent = async (contentId, feedback) => {
    try {
      await api.updateContentStatus(contentId, 'rejected', feedback);
      showToast('Content returned to drafting state with revisions requested.', 'warning');
      await refreshData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const runPublishNow = async (jobId) => {
    try {
      const res = await api.runJobNow(jobId);
      if (res.success) {
        showToast(`Published successfully! ${res.data?.result?.responseMessage || ''}`);
        await refreshData();
        return res.data;
      }
      throw new Error(res.message || 'Publishing failed');
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const toggleEmergencyKill = async (enable) => {
    try {
      const res = await api.toggleKillSwitch(enable);
      if (res.success) {
        setKillSwitchActive(enable);
        showToast(
          enable ? 'EMERGENCY KILL SWITCH ENGAGED: Queues halted.' : 'Global pause released: Normal queues resumed.',
          enable ? 'error' : 'success'
        );
        await refreshData();
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const addProduct = async (productData) => {
    try {
      const res = await api.createProduct(productData);
      if (res.success) {
        showToast(`Added offer "${productData.name}" to product library!`);
        await refreshData();
        return res.data;
      }
      throw new Error(res.message);
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const addCampaign = async (campaignData) => {
    try {
      const res = await api.createCampaign(campaignData);
      if (res.success) {
        showToast(`Launched campaign "${campaignData.name}"!`);
        await refreshData();
        return res.data;
      }
      throw new Error(res.message);
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const addSubscriber = async (subData) => {
    try {
      const res = await api.addEmailSubscriber(subData);
      if (res.success) {
        showToast(`Added subscriber ${subData.email} with verified opt-in!`);
        await refreshData();
        return res.data;
      }
      throw new Error(res.message);
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  return {
    ...context,
    generateContent,
    approveAndSchedule,
    rejectContent,
    runPublishNow,
    toggleEmergencyKill,
    addProduct,
    addCampaign,
    addSubscriber
  };
}

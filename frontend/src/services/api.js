const API_BASE = '/api';

export const api = {
  // Products
  getProducts: () => fetch(`${API_BASE}/products`).then(r => r.json()),
  createProduct: (data) => fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),

  // Campaigns
  getCampaigns: () => fetch(`${API_BASE}/campaigns`).then(r => r.json()),
  createCampaign: (data) => fetch(`${API_BASE}/campaigns`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),

  // Content Studio
  getContent: (status) => fetch(`${API_BASE}/content${status ? `?status=${status}` : ''}`).then(r => r.json()),
  generateContent: (data) => fetch(`${API_BASE}/content/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  updateContentStatus: (id, status, feedback) => fetch(`${API_BASE}/content/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, feedback })
  }).then(r => r.json()),

  // Video Production
  renderVideo: (data) => fetch(`${API_BASE}/video/render`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),

  // Publishing Queue
  getPublishJobs: () => fetch(`${API_BASE}/publish/jobs`).then(r => r.json()),
  scheduleContent: (id, platforms) => fetch(`${API_BASE}/content/${id}/schedule`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ platforms })
  }).then(r => r.json()),
  runJobNow: (id) => fetch(`${API_BASE}/publish/jobs/${id}/run`, { method: 'POST' }).then(r => r.json()),
  toggleKillSwitch: (enable) => fetch(`${API_BASE}/publish/kill-switch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enable })
  }).then(r => r.json()),

  // Social Accounts & Adapters
  getSocialAccounts: () => fetch(`${API_BASE}/social-accounts`).then(r => r.json()),
  getAdapters: () => fetch(`${API_BASE}/adapters`).then(r => r.json()),

  // Email Marketing (Module 7)
  getEmailSubscribers: () => fetch(`${API_BASE}/email/subscribers`).then(r => r.json()),
  addEmailSubscriber: (data) => fetch(`${API_BASE}/email/subscribers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  getEmailSequences: () => fetch(`${API_BASE}/email/sequences`).then(r => r.json()),

  // Compliance
  scanCompliance: (content, productId) => fetch(`${API_BASE}/compliance/scan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, productId })
  }).then(r => r.json()),

  // Analytics & Logs
  getAnalytics: () => fetch(`${API_BASE}/analytics`).then(r => r.json()),
  getAuditLogs: () => fetch(`${API_BASE}/audit-logs`).then(r => r.json())
};

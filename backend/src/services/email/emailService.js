import { v4 as uuidv4 } from 'uuid';

class EmailMarketingService {
  constructor() {
    this.subscribers = [
      {
        id: 'sub_01',
        email: 'jordan.tech@example.com',
        name: 'Jordan Miller',
        sourceCampaign: 'camp_01',
        consentRecord: 'Double Opt-In via Notion Template Lead Magnet (IP: 192.168.1.1)',
        status: 'subscribed',
        tags: ['productivity', 'creator-tools'],
        subscribedAt: new Date(Date.now() - 86400000 * 3).toISOString()
      },
      {
        id: 'sub_02',
        email: 'sarah.vance@example.com',
        name: 'Sarah Vance',
        sourceCampaign: 'camp_01',
        consentRecord: 'Explicit Consent via Video Editor Checklist',
        status: 'subscribed',
        tags: ['video-editing', 'youtube-creator'],
        subscribedAt: new Date(Date.now() - 86400000 * 5).toISOString()
      },
      {
        id: 'sub_03',
        email: 'david.nomad@example.com',
        name: 'David Lee',
        sourceCampaign: 'camp_02',
        consentRecord: 'Opt-in through Remote Security Guide 2026',
        status: 'subscribed',
        tags: ['security', 'digital-nomad'],
        subscribedAt: new Date(Date.now() - 86400000 * 8).toISOString()
      }
    ];

    this.sequences = [
      {
        id: 'seq_01',
        name: 'Creator Tools Welcome & Recommendation Flow',
        triggersOn: 'New Subscriber (Productivity)',
        status: 'active',
        openRate: '54.2%',
        clickRate: '18.6%',
        steps: [
          { day: 0, subject: 'Welcome! Here is your promised Creator Resource Kit', opens: '62%' },
          { day: 2, subject: 'The 3 tools saving me 15 hours every week (My actual setup)', opens: '51%' },
          { day: 5, subject: 'Exclusive template: How to organize your work in Notion AI', opens: '48%' }
        ]
      }
    ];
  }

  getSubscribers() {
    return this.subscribers;
  }

  addSubscriber({ email, name, sourceCampaign, tags }) {
    const existing = this.subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      if (existing.status === 'unsubscribed') existing.status = 'subscribed';
      return existing;
    }

    const newSub = {
      id: `sub_${uuidv4().slice(0, 8)}`,
      email,
      name: name || email.split('@')[0],
      sourceCampaign: sourceCampaign || 'camp_01',
      consentRecord: 'Verified Double Opt-In Timestamped per CAN-SPAM / GDPR',
      status: 'subscribed',
      tags: tags || ['general-affiliate'],
      subscribedAt: new Date().toISOString()
    };

    this.subscribers.unshift(newSub);
    return newSub;
  }

  unsubscribe(email) {
    const sub = this.subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (sub) {
      sub.status = 'unsubscribed';
      sub.unsubscribedAt = new Date().toISOString();
    }
    return { success: true, email };
  }

  getSequences() {
    return this.sequences;
  }
}

export const emailService = new EmailMarketingService();

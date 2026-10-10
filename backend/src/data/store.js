import { v4 as uuidv4 } from 'uuid';

class Store {
  constructor() {
    this.settings = {
      emergencyKillSwitch: false,
      autoApprovalRule: false,
      ftcComplianceStrict: true,
      simulationMode: true,
      activeAiProvider: 'gemini-intelligent-engine'
    };

    this.socialAccounts = [
      {
        id: 'acc_x_01',
        platform: 'x',
        accountName: 'TechVibe Reviews',
        handle: '@techvibe_hq',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
        status: 'connected',
        followers: 48200,
        dailyPostLimit: 15,
        postsToday: 3,
        requiresApproval: true,
        disclosureTag: '#ad #affiliate',
        apiQuotaRemaining: '94%'
      },
      {
        id: 'acc_yt_01',
        platform: 'youtube',
        accountName: 'Daily Productivity Tech',
        handle: '@DailyProdTech',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        status: 'connected',
        followers: 125000,
        dailyPostLimit: 4,
        postsToday: 1,
        requiresApproval: true,
        disclosureTag: 'Includes Paid Promotion / Affiliate Links',
        apiQuotaRemaining: '82%'
      },
      {
        id: 'acc_tiktok_01',
        platform: 'tiktok',
        accountName: 'Creator Tools Lab',
        handle: '@creatortoolslab',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
        status: 'connected',
        followers: 89400,
        dailyPostLimit: 5,
        postsToday: 2,
        requiresApproval: true,
        disclosureTag: 'Promotional Content (Commercial Toggle ON)',
        apiQuotaRemaining: '88%'
      },
      {
        id: 'acc_ig_01',
        platform: 'instagram',
        accountName: 'SaaS Hacks & Gear',
        handle: '@saashacks',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        status: 'connected',
        followers: 67100,
        dailyPostLimit: 6,
        postsToday: 1,
        requiresApproval: true,
        disclosureTag: 'Paid Partnership / #ad',
        apiQuotaRemaining: '91%'
      },
      {
        id: 'acc_li_01',
        platform: 'linkedin',
        accountName: 'Digital Growth Insights',
        handle: 'digital-growth-ai',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        status: 'connected',
        followers: 24800,
        dailyPostLimit: 3,
        postsToday: 0,
        requiresApproval: true,
        disclosureTag: 'Disclosure: Affiliate Partner Recommendation',
        apiQuotaRemaining: '98%'
      },
      {
        id: 'acc_pin_01',
        platform: 'pinterest',
        accountName: 'Smart Workspace Aesthetics',
        handle: 'smartworkspace',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
        status: 'connected',
        followers: 38200,
        dailyPostLimit: 12,
        postsToday: 4,
        requiresApproval: true,
        disclosureTag: 'Affiliate Pin (#affiliatelink)',
        apiQuotaRemaining: '85%'
      }
    ];

    this.products = [
      {
        id: 'prod_01',
        name: 'Notion AI & Team Workspace',
        network: 'Impact Radius',
        affiliateUrl: 'https://affiliate.notion.so/r/creator-growth-deal?subId=techvibe',
        commissionRate: '50% Recurring for 1st Year',
        price: '$10 - $20/mo',
        epc: '$1.42',
        conversionRate: '4.8%',
        category: 'Productivity & AI',
        rating: 4.9,
        targetAudience: 'Remote professionals, freelancers, content creators, tech teams',
        approvedClaims: [
          'All-in-one connected workspace for notes, docs, and project management',
          'Integrated AI writing assistant and Q&A over internal workspace docs',
          'Over 10,000 customizable templates and team collaboration features'
        ],
        forbiddenClaims: [
          'Guaranteed to replace all your employees',
          'Instant 10x salary boost with no effort',
          'Unverified claims of completely automated business operation'
        ],
        tags: ['productivity', 'ai-tools', 'saas', 'workflow'],
        status: 'active'
      },
      {
        id: 'prod_02',
        name: 'Descript AI Video & Podcast Editor',
        network: 'ShareASale',
        affiliateUrl: 'https://shareasale.com/r.cfm?b=18293&u=92841&m=48291&afftrack=videolab',
        commissionRate: '25% Lifetime Recurring',
        price: '$12 - $24/mo',
        epc: '$2.15',
        conversionRate: '5.2%',
        category: 'Creator Tech & Video',
        rating: 4.8,
        targetAudience: 'YouTubers, TikTok creators, podcasters, video editors',
        approvedClaims: [
          'Edit video by editing text transcripts like a word doc',
          'Studio Sound AI removes background noise and echoes with one click',
          'Automated filler word removal (ums, uhs) and AI voice cloning'
        ],
        forbiddenClaims: [
          'Auto-generates viral millions of views automatically without creator effort',
          'Completely replaces human editing skills overnight'
        ],
        tags: ['video-editing', 'creator-economy', 'podcasting', 'ai'],
        status: 'active'
      },
      {
        id: 'prod_03',
        name: 'NordVPN Ultimate Cybersecurity Suite',
        network: 'CJ Affiliate (Commission Junction)',
        affiliateUrl: 'https://cj.nordvpn.com/click-92841-849204?sid=securityhacks',
        commissionRate: '40% per Sale + Renewals',
        price: '$3.99/mo (2-yr plan)',
        epc: '$3.80',
        conversionRate: '7.1%',
        category: 'Cybersecurity & Tech',
        rating: 4.9,
        targetAudience: 'Digital nomads, privacy enthusiasts, frequent travelers, gamers',
        approvedClaims: [
          'Next-generation encryption across 6,000+ ultra-fast global servers',
          'Threat Protection Pro blocks malware, web trackers, and malicious ads',
          'Includes cross-platform password manager and encrypted cloud storage'
        ],
        forbiddenClaims: [
          '100% untraceable by law enforcement or illegal activity protection',
          'Immunity from all hacking regardless of user security negligence'
        ],
        tags: ['cybersecurity', 'vpn', 'privacy', 'tech'],
        status: 'active'
      },
      {
        id: 'prod_04',
        name: 'Superhuman AI Email Speed Engine',
        network: 'Custom Direct Partner',
        affiliateUrl: 'https://superhuman.com/refer/techvibe2026',
        commissionRate: '$50 Flat Bounty per Active Signup',
        price: '$30/mo',
        epc: '$4.10',
        conversionRate: '3.9%',
        category: 'Productivity & Software',
        rating: 4.7,
        targetAudience: 'Founders, executives, high-volume email operators, sales leaders',
        approvedClaims: [
          'Engineered for blazing fast Inbox Zero with keyboard-first navigation',
          'AI drafts replies in your personal tone and voice',
          'Read statuses, follow-up reminders, and scheduled sends'
        ],
        forbiddenClaims: [
          'Guaranteed to make you a CEO in 30 days',
          'Guaranteed $100k revenue increase'
        ],
        tags: ['email', 'saas', 'productivity', 'executive'],
        status: 'active'
      }
    ];

    this.campaigns = [
      {
        id: 'camp_01',
        name: 'Q4 Creator Productivity Tech Push',
        objective: 'Drive trials and subscriptions for high-EPC creator software',
        productIds: ['prod_01', 'prod_02'],
        targetAudience: 'Content creators, freelancers, and remote workers looking to save 10+ hrs/week',
        platforms: ['x', 'youtube', 'tiktok', 'instagram', 'linkedin', 'pinterest'],
        status: 'Active',
        totalPosts: 14,
        totalClicks: 2840,
        conversions: 142,
        revenue: 3420.50
      },
      {
        id: 'camp_02',
        name: 'Digital Privacy & Security Awareness',
        objective: 'Promote top-tier privacy tools to remote tech professionals',
        productIds: ['prod_03'],
        targetAudience: 'Digital nomads, remote workers, privacy-conscious developers',
        platforms: ['x', 'youtube', 'tiktok', 'instagram', 'linkedin', 'pinterest'],
        status: 'Active',
        totalPosts: 8,
        totalClicks: 1650,
        conversions: 118,
        revenue: 2190.00
      }
    ];

    this.contentItems = [
      {
        id: 'content_01',
        campaignId: 'camp_01',
        productId: 'prod_01',
        title: 'How I Organized My Entire 2026 Workflow in 10 Minutes with Notion AI',
        mediaType: 'short_video',
        videoConcept: 'Split screen: Left side messy desktop with 40 tabs vs Right side clean Notion dashboard auto-generating project tasks with AI.',
        script: {
          hook: "Stop keeping your work spread across 12 different tabs. Here is the single workspace setup saving me 15 hours a week.",
          visualDirectionHook: "Screen recording: Cluttered tabs vs Clean workspace",
          body: "Instead of jumping between Google Docs, Trello, and random notes, I migrated everything into Notion AI. When I paste meeting notes or research, it extracts every action item, assigns deadlines, and drafts client updates in 5 seconds. You don't need a huge team to stay organized.",
          visualDirectionBody: "Show action items auto-populating",
          cta: "Check the link in my bio or description to try it out with exclusive team template packs.",
          visualDirectionCta: "Arrow pointer to link in bio"
        },
        caption: "If you feel overwhelmed by scattered documents and projects, this setup will change how you work. Notion AI connects your docs, tasks, and notes into one coherent hub.\n\nAffiliate disclosure: I may earn a commission if you sign up through links in this post at no extra cost to you.",
        platformCaptions: {
          x: "Still keeping work across 12 tabs? Notion AI organized my entire workflow in 10 mins.\n\nCheck link in bio. #ad #affiliate",
          youtube: "How I organized my workflow with Notion AI in 2026 #Shorts #Productivity\n\nAffiliate disclosure: I may earn a commission if you purchase through links in this post.",
          tiktok: "Organize your workflow in 10 mins with Notion AI ⚡️ Link in bio!\n\n#Productivity #WorkSmart #ad",
          instagram: "Work smarter with Notion AI ✨ Link in bio for setup templates!\n\nAffiliate disclosure: I may earn a commission.\n#ProductivityTips #ad",
          linkedin: "Productivity is about removing friction from high-leverage workflows.\n\nDisclosure: Affiliate partner recommendation.\n#Productivity #Work",
          pinterest: "Discover how Notion AI helps professionals save hours every week. #smartworkspace #affiliatelink #ad"
        },
        hashtags: ['#Notion', '#ProductivityHacks', '#WorkflowAutomation', '#RemoteWork', '#AITools', '#ad'],
        mediaUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1080&auto=format&fit=crop&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80',
        affiliateDisclosure: "Affiliate disclosure: I may earn a commission if you purchase through links in this post, at no additional cost to you.",
        complianceChecked: true,
        complianceScore: 98,
        complianceNotes: "Mandatory FTC disclosure present. Verified approved features. No unsubstantiated claims.",
        approvalStatus: 'approved',
        approvedBy: 'Admin (Human Supervisor)',
        approvedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        targetPlatforms: ['x', 'youtube', 'tiktok', 'instagram', 'linkedin', 'pinterest']
      },
      {
        id: 'content_02',
        campaignId: 'camp_01',
        productId: 'prod_02',
        title: 'The AI Video Editor That Removes Filler Words in 1 Click (Descript)',
        mediaType: 'short_video',
        videoConcept: 'Over-the-shoulder creator footage recording video, showing instant transcript auto-cut and background studio noise wipeout.',
        script: {
          hook: "Editing videos used to take me 4 hours. Now it takes 15 minutes by editing words like a Google Doc.",
          visualDirectionHook: "Show deletion of words from transcript",
          body: "This is Descript. You speak, it transcribes, and when you delete a word from the text, it cuts that exact frame from your video. Plus, Studio Sound removes dogs barking and traffic noise instantly.",
          visualDirectionBody: "Show instant video cut corresponding to word delete",
          cta: "Tap the link below to get started for free.",
          visualDirectionCta: "Show cursor clicking download link"
        },
        caption: "Editing videos shouldn't be tedious timeline cutting. Try text-based editing with Descript.\n\nAffiliate disclosure: I may earn a commission if you purchase through links in this post, at no additional cost to you.",
        platformCaptions: {
          x: "Editing videos by deleting words like a Google Doc is a game changer.\n\nLink in bio #ad",
          youtube: "AI Video Editor removes filler words in 1 click (Descript) #Shorts\n\nAffiliate disclosure: I may earn a commission.",
          tiktok: "The video editor that actually cuts editing time by 80% 🎬 Link in bio!\n#VideoEditing #ad",
          instagram: "Edit video like text ✨ Link in bio for free access.\n#CreatorTools #ad",
          linkedin: "Video production efficiency with Descript text-based editing.\nDisclosure: Affiliate partner recommendation.",
          pinterest: "How to edit video 10x faster with Descript. #videoediting #affiliatelink #ad"
        },
        hashtags: ['#VideoEditing', '#ContentCreator', '#Descript', '#CreatorTools', '#VideoHacks', '#ad'],
        mediaUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1080&auto=format&fit=crop&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80',
        affiliateDisclosure: "Affiliate disclosure: I may earn a commission if you purchase through links in this post, at no additional cost to you.",
        complianceChecked: true,
        complianceScore: 95,
        complianceNotes: "Compliant FTC disclosure and clear software features.",
        approvalStatus: 'awaiting_approval',
        approvedBy: null,
        approvedAt: null,
        targetPlatforms: ['tiktok', 'youtube', 'instagram', 'x']
      }
    ];

    this.publishJobs = [
      {
        id: 'job_01',
        contentId: 'content_01',
        platform: 'x',
        scheduledAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        publishedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        status: 'published',
        attempts: 1,
        postId: 'tweet_1892048102',
        postUrl: 'https://x.com/techvibe_hq/status/1892048102',
        metrics: { impressions: 14200, clicks: 420, conversions: 24 }
      },
      {
        id: 'job_02',
        contentId: 'content_01',
        platform: 'youtube',
        scheduledAt: new Date(Date.now() - 3600000).toISOString(),
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        status: 'published',
        attempts: 1,
        postId: 'yt_short_9921',
        postUrl: 'https://youtube.com/shorts/9921_notion_workflow',
        metrics: { views: 32400, clicks: 810, conversions: 48 }
      },
      {
        id: 'job_03',
        contentId: 'content_01',
        platform: 'tiktok',
        scheduledAt: new Date(Date.now() + 3600000 * 4).toISOString(),
        publishedAt: null,
        status: 'queued',
        attempts: 0,
        postId: null,
        postUrl: null,
        metrics: { views: 0, clicks: 0, conversions: 0 }
      },
      {
        id: 'job_04',
        contentId: 'content_01',
        platform: 'instagram',
        scheduledAt: new Date(Date.now() + 3600000 * 7).toISOString(),
        publishedAt: null,
        status: 'queued',
        attempts: 0,
        postId: null,
        postUrl: null,
        metrics: { impressions: 0, clicks: 0, conversions: 0 }
      },
      {
        id: 'job_05',
        contentId: 'content_01',
        platform: 'linkedin',
        scheduledAt: new Date(Date.now() + 3600000 * 12).toISOString(),
        publishedAt: null,
        status: 'queued',
        attempts: 0,
        postId: null,
        postUrl: null,
        metrics: { impressions: 0, clicks: 0, conversions: 0 }
      },
      {
        id: 'job_06',
        contentId: 'content_01',
        platform: 'pinterest',
        scheduledAt: new Date(Date.now() + 3600000 * 15).toISOString(),
        publishedAt: null,
        status: 'queued',
        attempts: 0,
        postId: null,
        postUrl: null,
        metrics: { views: 0, clicks: 0, conversions: 0 }
      }
    ];

    this.auditLogs = [
      {
        id: 'log_01',
        timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
        actor: 'AI Content Studio',
        action: 'CONTENT_GENERATED',
        details: 'Drafted multi-platform package for "Notion AI & Team Workspace"',
        status: 'SUCCESS'
      },
      {
        id: 'log_02',
        timestamp: new Date(Date.now() - 3600000 * 5.5).toISOString(),
        actor: 'FTC Compliance Guardian',
        action: 'COMPLIANCE_VERIFIED',
        details: 'Scan passed with score 98/100. Disclosures verified.',
        status: 'SUCCESS'
      },
      {
        id: 'log_03',
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
        actor: 'Admin (Human Supervisor)',
        action: 'CONTENT_APPROVED',
        details: 'Approved content item #content_01 for social publication',
        status: 'SUCCESS'
      },
      {
        id: 'log_04',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        actor: 'X Publishing Adapter',
        action: 'POST_PUBLISHED',
        details: 'Published tweet #tweet_1892048102 with #ad disclosure',
        status: 'SUCCESS'
      },
      {
        id: 'log_05',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        actor: 'YouTube Shorts Adapter',
        action: 'POST_PUBLISHED',
        details: 'Uploaded vertical Short #yt_short_9921 with commercial disclosure enabled',
        status: 'SUCCESS'
      }
    ];
  }

  addAuditLog(actor, action, details, status = 'SUCCESS') {
    const log = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      actor,
      action,
      details,
      status
    };
    this.auditLogs.unshift(log);
    if (this.auditLogs.length > 200) this.auditLogs.pop();
    return log;
  }
}

export const dbStore = new Store();

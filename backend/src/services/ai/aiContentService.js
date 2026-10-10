import { ComplianceService } from '../content/complianceService.js';
import { FTC_DISCLOSURE_TEXT } from '../../config/constants.js';

export class AiContentService {
  static async generatePackage({ product, angle = 'problem-solution', tone = 'authentic-creator' }) {
    const productName = product.name || 'Featured Product';
    const claims = product.approvedClaims || [
      'Increases daily productivity and eliminates tedious busywork',
      'Seamless all-in-one interface designed for modern professionals'
    ];
    const category = product.category || 'Tech & Productivity';
    const audience = product.targetAudience || 'creators, freelancers, and professionals';

    const hooks = [
      `If you feel overwhelmed trying to keep up with ${category.toLowerCase()}, stop doing this manually.`,
      `I tested over 10 different tools for ${audience}, and this is the only one that saved me 15 hours a week.`,
      `The biggest mistake people make with their daily workflow is ignoring this one setup.`
    ];
    const selectedHook = hooks[Math.floor(Math.random() * hooks.length)];

    const script = {
      hook: selectedHook,
      visualDirectionHook: 'Fast visual: Close-up on stress-inducing cluttered screen, then snap transition to smooth workflow.',
      body: `Instead of wasting hours every day, ${productName} organizes everything in one place. ${claims[0]}. Plus, ${claims[1] || claims[0]}. It took me less than 5 minutes to set up and the difference was immediate.`,
      visualDirectionBody: `Screen recording showing 3 core features in rapid succession with smooth mouse movement and glowing highlights.`,
      cta: `If you want to test it yourself, check the link in my bio/description for the current promotional access.`,
      visualDirectionCta: 'Creator points to description link with animated cursor and clear arrow callout.'
    };

    const captions = {
      x: `Still doing ${category.toLowerCase()} manually? ${productName} completely streamlined my workflow.\n\n• ${claims[0]}\n• ${claims[1] || 'Saves 10+ hrs/wk'}\n\nFull details & link in bio.\n\n#ad #affiliate`,
      youtube: `How ${productName} transformed my entire ${category.toLowerCase()} workflow in 2026.\n\nKey highlights:\n- ${claims.join('\n- ')}\n\n🔗 Get access through the link in the description.\n\n${FTC_DISCLOSURE_TEXT}\n\n#Shorts #Productivity #TechHacks`,
      tiktok: `The one tool that actually saved me 15 hours this week ⚡️ No fluff, just pure efficiency with ${productName}.\n\nLink in bio to check it out!\n\n#CreatorTools #WorkSmart #AITools #ad`,
      instagram: `Work smarter, not harder ✨ Here is how I organized my workflow with ${productName}.\n\nDrop a comment or check the link in my bio for the exclusive setup templates!\n\n${FTC_DISCLOSURE_TEXT}\n\n#ProductivityTips #DailyTech #RemoteWork #ad`,
      linkedin: `Productivity isn't about working more hours—it's about removing friction from high-leverage workflows.\n\nRecently, our team integrated ${productName}. The immediate impact:\n1. ${claims[0]}\n2. ${claims[1] || 'Drastic reduction in manual overhead'}\n\nFor professionals managing demanding roadmaps, this is well worth exploring.\n\nDisclosure: Affiliate partner recommendation.\n\n#Productivity #FutureOfWork #Technology`,
      pinterest: `Discover how ${productName} helps ${audience} save hours every week. High-efficiency tools for modern workspaces.\n\n#productivity #smartworkspace #affiliatelink #ad`
    };

    const hashtags = [
      `#${category.replace(/[^a-zA-Z0-9]/g, '')}`,
      '#Productivity',
      '#WorkflowAutomation',
      '#TechTools',
      '#ad'
    ];

    const rawContent = {
      title: `How ${productName} Saves 10+ Hours Every Week (${category})`,
      videoConcept: `Dynamic vertical short-form video comparing old manual method vs automated workflow with ${productName}. High energy upbeat background audio, bold auto-captions with keyword color pop.`,
      script,
      caption: captions.tiktok,
      platformCaptions: captions,
      hashtags,
      affiliateDisclosure: FTC_DISCLOSURE_TEXT,
      mediaType: 'short_video',
      mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1080&auto=format&fit=crop&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
      affiliateUrl: product.affiliateUrl,
      approvalStatus: 'awaiting_approval'
    };

    const compliance = ComplianceService.verify(rawContent, product);
    rawContent.complianceScore = compliance.score;
    rawContent.complianceNotes = compliance.issues.length 
      ? compliance.issues.join(' | ') 
      : 'Compliant with FTC Endorsement Guides. Clear commercial disclosures present.';

    return rawContent;
  }
}

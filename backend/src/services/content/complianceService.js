import { FTC_DISCLOSURE_TEXT } from '../../config/constants.js';

const DECEPTIVE_CLAIM_PATTERNS = [
  /guaranteed\s+(wealth|rich|profit|income|100%|cure|success)/i,
  /miracle\s+(cure|pill|remedy|solution)/i,
  /make\s+\$\d+[,0-9]*\s+(in|within)\s+(hours|days|minutes)\s+guaranteed/i,
  /secret\s+(trick|hack)\s+(doctors|banks|lawyers)\s+hate/i,
  /zero\s+effort\s+passive\s+fortune/i,
  /lose\s+\d+\s+lbs\s+in\s+\d+\s+days\s+without\s+diet/i,
  /100%\s+risk-free\s+guaranteed\s+return/i
];

export class ComplianceService {
  static verify(content, product = null) {
    const issues = [];
    const warnings = [];
    let score = 100;

    const fullText = [
      content.title || '',
      content.caption || '',
      content.script?.hook || '',
      content.script?.body || '',
      content.script?.cta || '',
      content.affiliateDisclosure || ''
    ].join(' ');

    const hasExplicitDisclosure = 
      /affiliate disclosure|commission|#ad|#affiliate|sponsored|paid partnership|earn a commission/i.test(fullText);

    if (!hasExplicitDisclosure) {
      issues.push('CRITICAL: Missing clear and conspicuous FTC affiliate disclosure.');
      score -= 40;
    }

    for (const pattern of DECEPTIVE_CLAIM_PATTERNS) {
      if (pattern.test(fullText)) {
        issues.push(`POLICY VIOLATION: Deceptive claim detected matching pattern: ${pattern}`);
        score -= 30;
      }
    }

    if (product && Array.isArray(product.forbiddenClaims)) {
      for (const forbidden of product.forbiddenClaims) {
        const words = forbidden.toLowerCase().split(' ').filter(w => w.length > 4);
        const matches = words.filter(w => fullText.toLowerCase().includes(w));
        if (matches.length >= Math.ceil(words.length * 0.75)) {
          issues.push(`MERCHANT RESTRICTION: Content contains claim prohibited by advertiser: "${forbidden}"`);
          score -= 25;
        }
      }
    }

    score = Math.max(0, Math.min(100, score));
    const passed = issues.length === 0 && score >= 75;

    let autoFixedCaption = content.caption || '';
    if (!hasExplicitDisclosure) {
      autoFixedCaption += `\n\n${FTC_DISCLOSURE_TEXT}`;
    }

    return {
      passed,
      score,
      issues,
      warnings,
      checkedAt: new Date().toISOString(),
      standardDisclosureText: FTC_DISCLOSURE_TEXT,
      autoFixedCaption
    };
  }
}

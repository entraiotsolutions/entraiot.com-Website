/**
 * businessDetector.ts
 * Detects industry/business type from user input.
 */

export type BusinessType = "real_estate" | "retail" | "it" | null;

const BUSINESS_KEYWORDS: Record<string, string[]> = {
  real_estate: ["real estate", "property", "house", "apartment", "builder"],
  retail: ["retail", "ecommerce", "shop", "store", "selling"],
  it: ["software", "it", "tech", "agency", "development", "app"]
};

export function detectBusiness(message: string): BusinessType {
  const msg = message.toLowerCase();

  for (const [type, keywords] of Object.entries(BUSINESS_KEYWORDS)) {
    if (keywords.some(kw => msg.includes(kw))) {
      return type as BusinessType;
    }
  }

  return null;
}

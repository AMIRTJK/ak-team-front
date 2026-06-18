// ⚠️ TODO: ВСЕ ЦЕНЫ И СРОКИ НИЖЕ — ОРИЕНТИРОВОЧНЫЕ ПЛЕЙСХОЛДЕРЫ.
// Это бизнес-параметры A&K — обязательно пересмотрите и выставьте свои значения.
// Валюта — USD. На сайте всегда показываем вилку «от–до»; финальная цифра — только в личной смете.

export interface ProjectType {
  id: string;
  label: string;
  priceMin: number;
  priceMax: number;
  weeksMin: number;
  weeksMax: number;
}

export interface ModuleOption {
  id: string;
  label: string;
  hint?: string;
  priceMin: number;
  priceMax: number;
  weeks: number;
}

export interface ChoiceOption {
  id: string;
  label: string;
}

export interface UrgencyOption extends ChoiceOption {
  priceFactor: number;
  weekFactor: number;
}

export interface SupportOption extends ChoiceOption {
  price: number;
}

export interface EstimateConfig {
  typeId: string;
  moduleIds: string[];
  urgencyId: string;
  supportId: string;
}

export interface EstimateResult {
  priceMin: number;
  priceMax: number;
  weeksMin: number;
  weeksMax: number;
}

export const PROJECT_TYPES: ProjectType[] = [
  { id: "landing", label: "Landing Page", priceMin: 400, priceMax: 900, weeksMin: 1, weeksMax: 2 },
  { id: "corporate", label: "Corporate Site", priceMin: 1000, priceMax: 2500, weeksMin: 3, weeksMax: 5 },
  { id: "news", label: "News Portal", priceMin: 2000, priceMax: 4500, weeksMin: 5, weeksMax: 8 },
  { id: "ecommerce", label: "E-commerce", priceMin: 2500, priceMax: 6000, weeksMin: 6, weeksMax: 10 },
  { id: "crm", label: "CRM System", priceMin: 4000, priceMax: 9000, weeksMin: 8, weeksMax: 14 },
  { id: "erp", label: "ERP System", priceMin: 6000, priceMax: 14000, weeksMin: 12, weeksMax: 20 },
  { id: "portal", label: "Web Portal", priceMin: 3000, priceMax: 7000, weeksMin: 7, weeksMax: 12 },
  { id: "custom", label: "Custom Web App", priceMin: 3000, priceMax: 10000, weeksMin: 6, weeksMax: 16 },
];

export const MODULES: ModuleOption[] = [
  { id: "design", label: "Custom design", hint: "vs. build from your design", priceMin: 500, priceMax: 1500, weeks: 1 },
  { id: "cms", label: "CMS / content editing", hint: "edit content yourself", priceMin: 400, priceMax: 1000, weeks: 1 },
  { id: "i18n", label: "Multi-language", hint: "2+ languages", priceMin: 300, priceMax: 700, weeks: 1 },
  { id: "auth", label: "Auth & accounts", hint: "login, roles, profiles", priceMin: 400, priceMax: 1100, weeks: 1 },
  { id: "payments", label: "Payments", hint: "online payments", priceMin: 500, priceMax: 1400, weeks: 1 },
  { id: "admin", label: "Admin dashboard", hint: "manage data & users", priceMin: 800, priceMax: 2000, weeks: 2 },
  { id: "integrations", label: "Integrations", hint: "1C, CRM, Telegram bots", priceMin: 400, priceMax: 1500, weeks: 1 },
  { id: "ai", label: "AI features", hint: "assistant, RAG, automation", priceMin: 1000, priceMax: 4000, weeks: 3 },
  { id: "seo", label: "SEO package", hint: "technical SEO setup", priceMin: 200, priceMax: 600, weeks: 0 },
];

export const URGENCY: UrgencyOption[] = [
  { id: "standard", label: "Standard", priceFactor: 1, weekFactor: 1 },
  { id: "fast", label: "Fast", priceFactor: 1.25, weekFactor: 0.8 },
  { id: "asap", label: "ASAP", priceFactor: 1.6, weekFactor: 0.6 },
];

export const SUPPORT: SupportOption[] = [
  { id: "none", label: "No support", price: 0 },
  { id: "m3", label: "3 months", price: 300 },
  { id: "m6", label: "6 months", price: 600 },
  { id: "m12", label: "12 months", price: 1000 },
];

export function estimate(config: EstimateConfig): EstimateResult {
  const type = PROJECT_TYPES.find((t) => t.id === config.typeId);
  if (!type) return { priceMin: 0, priceMax: 0, weeksMin: 0, weeksMax: 0 };

  let priceMin = type.priceMin;
  let priceMax = type.priceMax;
  let weeksMin = type.weeksMin;
  let weeksMax = type.weeksMax;

  for (const id of config.moduleIds) {
    const m = MODULES.find((x) => x.id === id);
    if (!m) continue;
    priceMin += m.priceMin;
    priceMax += m.priceMax;
    weeksMin += m.weeks;
    weeksMax += m.weeks;
  }

  const support = SUPPORT.find((s) => s.id === config.supportId);
  if (support) {
    priceMin += support.price;
    priceMax += support.price;
  }

  const urgency = URGENCY.find((u) => u.id === config.urgencyId);
  if (urgency) {
    priceMin = Math.round(priceMin * urgency.priceFactor);
    priceMax = Math.round(priceMax * urgency.priceFactor);
    weeksMin = Math.max(1, Math.round(weeksMin * urgency.weekFactor));
    weeksMax = Math.max(1, Math.round(weeksMax * urgency.weekFactor));
  }

  return { priceMin, priceMax, weeksMin, weeksMax };
}

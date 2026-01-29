/**
 * * Configuration of the i18n system data files and text translations
 * Example translations below are for English and French, with textTranslations used in src/layouts/BlogLayoutCenter.astro and src/components/Hero/[hero].astro
 */

/**
 * * Data file configuration for the i18n system
 * Every {Data} key must exist in the below object
 */
import testimonialDataZh from "./zh/testimonialData.json";
import teamDataZh from "./zh/teamData.json";
import faqDataZh from "./zh/faqData.json";
import navDataZh from "./zh/navData.json";
import siteDataZh from "./zh/siteData.json";
import siteDataEn from "./en/siteData.json";
import navDataEn from "./en/navData.json";
import faqDataEn from "./en/faqData.json";
import teamDataEn from "./en/teamData.json";
import testimonialDataEn from "./en/testimonialData.json";

export const dataTranslations = {
  zh: {
    siteData: siteDataZh,
    navData: navDataZh,
    faqData: faqDataZh,
    teamData: teamDataZh,
    testimonialData: testimonialDataZh,
  },
  en: {
    siteData: siteDataEn,
    navData: navDataEn,
    faqData: faqDataEn,
    teamData: teamDataEn,
    testimonialData: testimonialDataEn,
  },
  
} as const;

/**
 * * Text translations are used with the `useTranslation` function from src/js/i18nUtils.ts to translate various strings on your site.
 *
 * ## Example
 *
 * ```ts
 * import { getLocaleFromUrl } from "@js/localeUtils";
 * import { useTranslations } from "@js/translationUtils";
 * const currLocale = getLocaleFromUrl(Astro.url);
 * const t = useTranslations(currLocale);
 * t("back_to_all_posts"); // this would be "Retour à tous les articles" if the current locale is "fr"
 * ```
 * or
 * ```ts
 * import { useTranslations } from "@js/translationUtils";
 * const t = useTranslations("fr");
 * t("back_to_all_posts"); // this would be "Retour à tous les articles"
 * ```
 */
export const textTranslations = {
  zh: {
    hero_text: "Welcome.",
    hero_description:
      "Established in 1969, the CCAT is a dynamic organisation vested in the local, educational, and ancestral interests of its members. Through partnerships with similar organisations and participation in major events, CCAT fosters social cohesion and cross-cultural understanding. The CCAT hosts a wide range of festivals, public events and workshops, that celebrate Chinese culture, language, heritage, and the arts. These initiatives are open to the broader community, encouraging inclusivity and mutual respect.  It also provides information sessions for schools.  While the CCAT receives council grants for specific community-benefit programs, it also relies on fundraising and generous support from corporate sponsors, donors, members, and the public to sustain its services and activities.",
    back_to_all_posts: "Back to all posts",
    updated: "Updated",
  },
  en: {
    hero_text: "Welcome",
    hero_description:
      "Established in 1969, the CCAT is a dynamic organisation vested in the local, educational, and ancestral interests of its members. Through partnerships with similar organisations and participation in major events, CCAT fosters social cohesion and cross-cultural understanding. The CCAT hosts a wide range of festivals, public events and workshops, that celebrate Chinese culture, language, heritage, and the arts. These initiatives are open to the broader community, encouraging inclusivity and mutual respect.  It also provides information sessions for schools.  While the CCAT receives council grants for specific community-benefit programs, it also relies on fundraising and generous support from corporate sponsors, donors, members, and the public to sustain its services and activities.",
    back_to_all_posts: "Back to all posts",
    updated: "Updated",
  },
  
} as const;

/**
 * * Route translations are used to translate route names for the language switcher component
 * This can be useful for SEO reasons. The key does not matter, it just needs to match between languages
 *
 * ## Notes
 *
 * - These routes must be everything after the base domain. So if this is "atlas.com/blog", the route would be "blog"
 *   - Or if this is "atlas.com/legal/privacy", the route would be "legal/privacy"
 * - This also supports wildcards for language switcher and SEO purposes, and works in conjunction with the localizedCollections object below
 *   - For example, "categories/*" would match "categories/1" or "categories/2" etc for that language.
 */
export const routeTranslations = {
  zh: {
    aboutKey: "about",
    categoryKey: "categories",
    categoryKey2: "categories/*",
    categoryKey3: "categories",
    blogKey: "blog",
    servicesKey: "services",
  },
  en: {
    aboutKey: "about",
    categoryKey: "categories",
    categoryKey2: "categories/*",
    categoryKey3: "categories",
    blogKey: "blog",
    servicesKey: "services",
  },
  
} as const;

/**
 * * Content collection translations used by the language switcher and hreflang generator
 *
 * Per-collection, per-locale route base mapping (collections to localize are the keys)
 *
 * If you have a key of "blog" then the blog content collection will be localized. This will look
 * for a "mappingKey" in the entry metadata, and use that to map the entry to the correct locale
 *
 * You can use the locale value to map the collection to a different route if desired
 *
 * Note: this does NOT affect the getLocalizedRoute() function. To translate the base routes use the routeTranslations object
 */
export const localizedCollections = {
  blog: {
		en: "blog",
		zh: "blog"
	},
  services: {
		en: "services",
		zh: "services"
	},
  // Add more collections/locales as needed
} as const;

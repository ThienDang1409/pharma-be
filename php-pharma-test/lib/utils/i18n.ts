/**
 * Helper functions for i18n content
 */

export type Language = "vi" | "en";

/**
 * Get localized text based on current language
 * Falls back to Vietnamese if English version is not available
 */
export function getLocalizedText(
  viText: string,
  enText: string | undefined | null,
  language: Language
): string {
  if (language === "en" && enText) {
    return enText;
  }
  return viText;
}

/**
 * Get localized field name for API queries
 */
export function getLocalizedFieldName(
  fieldName: string,
  language: Language
): string {
  if (language === "en") {
    return `${fieldName}_en`;
  }
  return fieldName;
}

import { AI_PROVIDER_MAP, AIProviderNodeType } from "@/lib/constants";

export type SettingsValues = Record<string, string | undefined>;

/**
 * Compares current form values with original values and returns only the changed fields.
 * This ensures we only send updates for fields that were actually modified by the user.
 *
 * @param currentValues - The current form values
 * @param originalValues - The original values loaded from the server
 * @returns An object containing only the fields that changed
 *
 * @example
 * const original = { openai: "key1", gemini: "", anthropic: "" };
 * const current = { openai: "key1", gemini: "new-key", anthropic: "" };
 * getChangedSettings(current, original);
 * // Returns: { gemini: "new-key" }
 */
export function getChangedSettings(
  currentValues: SettingsValues,
  originalValues: SettingsValues
): Partial<SettingsValues> {
  const updates: Partial<SettingsValues> = {};

  (Object.keys(AI_PROVIDER_MAP) as AIProviderNodeType[]).forEach((provider) => {
    const currentValue = currentValues[provider] || "";
    const originalValue = originalValues[provider] || "";

    // If value changed from original, include it
    if (currentValue !== originalValue) {
      updates[provider] = currentValue;
    }
  });

  return updates;
}

import { Prisma } from "@/generated/prisma";
import { AI_PROVIDERS, Settings } from "@/lib/constants";
import { encrypt, decrypt } from "@/lib/crypto";

export type SettingsObject = Prisma.JsonObject;

/**
 * Decrypts all AI provider API keys in the settings object.
 * Used when retrieving settings to send to the client.
 *
 * @param settings - The settings object with encrypted API keys
 * @returns A new settings object with decrypted API keys
 */
export function decryptProviderKeys(settings: SettingsObject): SettingsObject {
  const decryptedSettings = { ...settings };

  Object.values(AI_PROVIDERS).forEach((key) => {
    const provider = key as keyof Settings;
    const encryptedValue = settings[provider];

    if (encryptedValue && typeof encryptedValue === "string") {
      try {
        decryptedSettings[provider] = decrypt(encryptedValue);
      } catch (error) {
        // If decryption fails, return as is (might already be decrypted or invalid)
        decryptedSettings[provider] = encryptedValue;
      }
    }
  });

  return decryptedSettings;
}

/**
 * Encrypts AI provider API keys that are being updated.
 * Merges the updates with current settings, encrypting only the changed values.
 *
 * @param currentSettings - The current settings object with encrypted values
 * @param updates - Object containing the updates to apply (unencrypted values from client)
 * @returns A new settings object with encrypted updates applied
 */
export function encryptProviderKeyUpdates(
  currentSettings: SettingsObject,
  updates: Partial<Record<string, string | undefined>>
): SettingsObject {
  const updatedSettings = { ...currentSettings };

  Object.values(AI_PROVIDERS).forEach((key) => {
    const provider = key as keyof Settings;
    const newKey = updates[provider];

    // Only update if a new value is provided
    if (newKey !== undefined) {
      // Empty string means delete the key
      if (newKey === "") {
        updatedSettings[provider] = undefined;
      } else {
        updatedSettings[provider] = encrypt(newKey);
      }
    }
    // If not in updates, keep the existing encrypted value (already in updatedSettings)
  });

  return updatedSettings;
}

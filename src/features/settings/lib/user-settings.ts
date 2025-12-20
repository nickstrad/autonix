import { Settings } from "@/lib/constants";

/**
 * UserSettings class provides a convenient interface for working with user settings.
 * Provides type-safe access to settings values through getters and setters.
 */
export class UserSettings {
  private settings: Partial<Settings>;

  constructor(settings?: Partial<Settings> | Record<string, unknown>) {
    this.settings = (settings as Partial<Settings>) || {};
  }

  /**
   * Get a setting value by key and decrypt it. For server-side use.
   * This assumes the value was encrypted.
   */
  getVal(key: string): string | undefined {
    return this.settings[key as keyof Settings];
  }

  /**
   * Export settings object
   */
  toObject(): Partial<Settings> {
    return { ...this.settings };
  }
}

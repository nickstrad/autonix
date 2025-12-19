import { AI_PROVIDERS, Settings } from "@/lib/constants";

/**
 * UserSettings class provides a convenient interface for working with user settings.
 * Provides type-safe access to settings values through getters and setters.
 */
export class UserSettings {
  private settings: Partial<Settings>;

  constructor(settings?: Partial<Settings> | Record<string, unknown>) {
    this.settings = (settings as Partial<Settings>) || {};
  }

  // Gemini API key
  get gemini(): string | undefined {
    return this.settings[AI_PROVIDERS.GEMINI];
  }

  set gemini(value: string | undefined) {
    if (value !== undefined && value !== null) {
      this.settings[AI_PROVIDERS.GEMINI] = value;
    }
  }

  // Anthropic API key
  get anthropic(): string | undefined {
    return this.settings[AI_PROVIDERS.ANTHROPIC];
  }

  set anthropic(value: string | undefined) {
    if (value !== undefined && value !== null) {
      this.settings[AI_PROVIDERS.ANTHROPIC] = value;
    }
  }

  // OpenAI API key
  get openai(): string | undefined {
    return this.settings[AI_PROVIDERS.OPENAI];
  }

  set openai(value: string | undefined) {
    if (value !== undefined && value !== null) {
      this.settings[AI_PROVIDERS.OPENAI] = value;
    }
  }

  /**
   * Get a setting value by key (for dynamic access)
   */
  get(key: string): string | undefined {
    return this.settings[key as keyof Settings];
  }

  /**
   * Set a setting value by key (for dynamic access)
   */
  set(key: string, value: string): void {
    this.settings[key as keyof Settings] = value;
  }

  /**
   * Check if a setting value exists and is not empty
   */
  has(key: string): boolean {
    const value = this.get(key);
    return !!value && value.trim() !== "";
  }

  /**
   * Export settings object
   */
  toObject(): Partial<Settings> {
    return { ...this.settings };
  }
}

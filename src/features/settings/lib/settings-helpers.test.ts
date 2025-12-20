import { getChangedSettings } from "./settings-helpers";

// Mock the constants module to avoid ESM import issues in Jest
jest.mock("@/lib/constants", () => ({
  AI_PROVIDER_MAP: {
    openai: "OpenAI",
    gemini: "Gemini",
    anthropic: "Anthropic",
  },
  AI_PROVIDERS: {
    OPENAI: "openai",
    GEMINI: "gemini",
    ANTHROPIC: "anthropic",
  },
}));

describe("settings-helpers", () => {
  describe("getChangedSettings", () => {
    it("should return empty object when no changes", () => {
      const original = { openai: "key1", gemini: "", anthropic: "" };
      const current = { openai: "key1", gemini: "", anthropic: "" };

      const result = getChangedSettings(current, original);

      expect(result).toEqual({});
    });

    it("should detect added key", () => {
      const original = { openai: "", gemini: "", anthropic: "" };
      const current = { openai: "new-key", gemini: "", anthropic: "" };

      const result = getChangedSettings(current, original);

      expect(result).toEqual({ openai: "new-key" });
    });

    it("should detect changed key", () => {
      const original = { openai: "old-key", gemini: "", anthropic: "" };
      const current = { openai: "new-key", gemini: "", anthropic: "" };

      const result = getChangedSettings(current, original);

      expect(result).toEqual({ openai: "new-key" });
    });

    it("should detect revoked key (cleared to empty string)", () => {
      const original = { openai: "key1", gemini: "", anthropic: "" };
      const current = { openai: "", gemini: "", anthropic: "" };

      const result = getChangedSettings(current, original);

      expect(result).toEqual({ openai: "" });
    });

    it("should detect multiple changes", () => {
      const original = { openai: "old-key", gemini: "", anthropic: "key3" };
      const current = {
        openai: "new-key",
        gemini: "new-gemini",
        anthropic: "key3",
      };

      const result = getChangedSettings(current, original);

      expect(result).toEqual({ openai: "new-key", gemini: "new-gemini" });
    });

    it("should detect adding and revoking in same update", () => {
      const original = { openai: "key1", gemini: "", anthropic: "" };
      const current = { openai: "", gemini: "new-key", anthropic: "" };

      const result = getChangedSettings(current, original);

      expect(result).toEqual({ openai: "", gemini: "new-key" });
    });

    it("should handle undefined values as empty strings", () => {
      const original = { openai: undefined, gemini: "", anthropic: "" };
      const current = { openai: "new-key", gemini: "", anthropic: "" };

      const result = getChangedSettings(current, original);

      expect(result).toEqual({ openai: "new-key" });
    });
  });
});

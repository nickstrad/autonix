import {
  decryptProviderKeys,
  encryptProviderKeyUpdates,
} from "./settings-crypto-helpers";

// Mock the constants module to avoid ESM import issues in Jest
jest.mock("@/lib/constants", () => ({
  AI_PROVIDERS: {
    OPENAI: "openai",
    GEMINI: "gemini",
    ANTHROPIC: "anthropic",
  },
}));

// Mock the crypto module
jest.mock("@/lib/crypto", () => ({
  encrypt: (text: string) => `encrypted:${text}`,
  decrypt: (text: string) => {
    if (text.startsWith("encrypted:")) {
      return text.replace("encrypted:", "");
    }
    return text;
  },
}));

describe("settings-crypto-helpers", () => {
  describe("decryptProviderKeys", () => {
    it("should decrypt all provider keys", () => {
      const settings = {
        openai: "encrypted:sk-openai-key",
        gemini: "encrypted:gemini-key",
        anthropic: "",
      };

      const result = decryptProviderKeys(settings);

      expect(result).toEqual({
        openai: "sk-openai-key",
        gemini: "gemini-key",
        anthropic: "",
      });
    });

    it("should handle empty settings", () => {
      const settings = {};

      const result = decryptProviderKeys(settings);

      expect(result).toEqual({});
    });

    it("should preserve non-string values", () => {
      const settings = {
        openai: "encrypted:key1",
        someOtherField: 123,
        anotherField: { nested: "value" },
      };

      const result = decryptProviderKeys(settings);

      expect(result).toEqual({
        openai: "key1",
        someOtherField: 123,
        anotherField: { nested: "value" },
      });
    });

    it("should handle undefined values", () => {
      const settings = {
        openai: undefined,
        gemini: "encrypted:key",
        anthropic: "",
      };

      const result = decryptProviderKeys(settings);

      expect(result).toEqual({
        openai: undefined,
        gemini: "key",
        anthropic: "",
      });
    });
  });

  describe("encryptProviderKeyUpdates", () => {
    it("should encrypt new keys while preserving existing ones", () => {
      const currentSettings = {
        openai: "encrypted:old-key",
        gemini: "",
        anthropic: "",
      };
      const updates = {
        gemini: "new-gemini-key",
      };

      const result = encryptProviderKeyUpdates(currentSettings, updates);

      expect(result).toEqual({
        openai: "encrypted:old-key", // unchanged
        gemini: "encrypted:new-gemini-key", // encrypted
        anthropic: "", // unchanged
      });
    });

    it("should set provider to undefined when empty string is passed (revoke)", () => {
      const currentSettings = {
        openai: "encrypted:key1",
        gemini: "encrypted:key2",
        anthropic: "",
      };
      const updates = {
        openai: "",
      };

      const result = encryptProviderKeyUpdates(currentSettings, updates);

      expect(result).toEqual({
        openai: undefined, // revoked
        gemini: "encrypted:key2", // unchanged
        anthropic: "", // unchanged
      });
    });

    it("should handle multiple updates at once", () => {
      const currentSettings = {
        openai: "encrypted:old-openai",
        gemini: "",
        anthropic: "encrypted:old-anthropic",
      };
      const updates = {
        openai: "new-openai-key",
        gemini: "new-gemini-key",
      };

      const result = encryptProviderKeyUpdates(currentSettings, updates);

      expect(result).toEqual({
        openai: "encrypted:new-openai-key",
        gemini: "encrypted:new-gemini-key",
        anthropic: "encrypted:old-anthropic", // unchanged
      });
    });

    it("should handle adding and revoking in same update", () => {
      const currentSettings = {
        openai: "encrypted:key1",
        gemini: "",
        anthropic: "",
      };
      const updates = {
        openai: "", // revoke
        gemini: "new-gemini", // add
      };

      const result = encryptProviderKeyUpdates(currentSettings, updates);

      expect(result).toEqual({
        openai: undefined,
        gemini: "encrypted:new-gemini",
        anthropic: "",
      });
    });

    it("should not modify keys not in updates", () => {
      const currentSettings = {
        openai: "encrypted:key1",
        gemini: "encrypted:key2",
        anthropic: "encrypted:key3",
      };
      const updates = {}; // no updates

      const result = encryptProviderKeyUpdates(currentSettings, updates);

      expect(result).toEqual({
        openai: "encrypted:key1",
        gemini: "encrypted:key2",
        anthropic: "encrypted:key3",
      });
    });

    it("should preserve other fields in settings", () => {
      const currentSettings = {
        openai: "encrypted:key1",
        someOtherField: "value",
        anotherField: 123,
      };
      const updates = {
        gemini: "new-key",
      };

      const result = encryptProviderKeyUpdates(currentSettings, updates);

      expect(result).toEqual({
        openai: "encrypted:key1",
        gemini: "encrypted:new-key",
        someOtherField: "value",
        anotherField: 123,
      });
    });
  });
});

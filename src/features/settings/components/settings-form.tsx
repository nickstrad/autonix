"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  AI_PROVIDER_MAP,
  AI_PROVIDERS,
  AIProviderNodeType,
} from "@/lib/constants";
import {
  useGetSettings,
  useUpdateSettings,
} from "@/features/settings/hooks/use-settings";
import { UserSettings } from "@/features/settings/lib/user-settings";
import { getChangedSettings } from "@/features/settings/lib/settings-helpers";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const FormSchema = z.object({
  [AI_PROVIDERS.GEMINI]: z.string().optional(),
  [AI_PROVIDERS.ANTHROPIC]: z.string().optional(),
  [AI_PROVIDERS.OPENAI]: z.string().optional(),
});

const labels: Record<
  AIProviderNodeType,
  { label: string; description: string }
> = {
  [AI_PROVIDERS.GEMINI]: {
    label: "Google Gemini API Key",
    description:
      "API Key for making Google Gemini requests(https://ai.google.dev/gemini-api/docs/api-key).",
  },
  [AI_PROVIDERS.ANTHROPIC]: {
    label: "Anthropic API Key",
    description:
      "API Key for making Anthropic requests(https://www.merge.dev/blog/anthropic-api-key).",
  },
  [AI_PROVIDERS.OPENAI]: {
    label: "OpenAI API Key",
    description:
      "API Key for making OpenAI requests(https://platform.openai.com/api-keys).",
  },
};

type FormValues = z.infer<typeof FormSchema>;
type SettingsFormProps = {
  onClose: () => void;
};
export function SettingsForm({ onClose }: SettingsFormProps) {
  const { data: settings } = useGetSettings();
  const updateSettings = useUpdateSettings();
  const originalValuesRef = useRef<FormValues>({});

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      [AI_PROVIDERS.GEMINI]: "",
      [AI_PROVIDERS.ANTHROPIC]: "",
      [AI_PROVIDERS.OPENAI]: "",
    },
  });

  useEffect(() => {
    if (!settings) {
      return;
    }
    const userSettings = new UserSettings(
      settings as Record<string, unknown> | undefined
    );
    const settingsObject = userSettings.toObject();
    originalValuesRef.current = settingsObject;
    form.reset(settingsObject);
  }, [form, settings]);

  const onSubmit = (data: FormValues) => {
    // Only send fields that have changed or are being explicitly cleared
    const updates = getChangedSettings(data, originalValuesRef.current);

    // Only submit if there are actual changes
    if (Object.keys(updates).length === 0) {
      toast.info("No changes to save");
      onClose();
      return;
    }

    try {
      updateSettings.mutate(updates);
      onClose();
    } catch (err) {
      toast.error("Failed to update settings");
      console.error("Failed to update settings", err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {(Object.keys(AI_PROVIDER_MAP) as AIProviderNodeType[]).map(
            (provider) => (
              <FormField
                key={provider}
                control={form.control}
                name={provider}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{labels[provider].label}</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormDescription>
                      {labels[provider].description}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          )}
        </div>
        <Button type="submit" disabled={updateSettings.isPending}>
          {updateSettings.isPending ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
}

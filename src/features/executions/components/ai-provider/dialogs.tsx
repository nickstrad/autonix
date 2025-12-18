"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import z from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  variableName: z
    .string()
    .min(1, { message: "Variable name is required" })
    .regex(/^[a-zA-Z_][a-zA-Z0-9_]*$/, {
      message:
        "Variable name must start with a letter or underscore and contain only letters, numbers, and underscores",
    }),
  prompt: z.string().min(1, {
    message: "Prompt is required",
  }),
});

export type AIProviderFormValues = z.infer<typeof formSchema>;
type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  defaultValues?: Partial<AIProviderFormValues>;
  providerName: string;
};

const getDefaultValues = (
  defaultValues?: Partial<AIProviderFormValues>
): AIProviderFormValues => ({
  variableName: defaultValues?.variableName ?? "",
  prompt: defaultValues?.prompt ?? "",
});

export const AIProviderDialog = ({
  defaultValues,
  open,
  onOpenChange,
  onSubmit,
  providerName,
}: Props) => {
  const form = useForm<AIProviderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(defaultValues),
  });

  const watchVariableName = form.watch("variableName");

  useEffect(() => {
    if (open) {
      form.reset(getDefaultValues(defaultValues));
    }
  }, [open, defaultValues, form]);

  function handleSubmit(data: AIProviderFormValues) {
    onSubmit(data);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{providerName} AI</DialogTitle>
          <DialogDescription>
            Configure settings for the {providerName} AI node
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="ai-provider-form"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="variableName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variable Name</FormLabel>
                  <FormControl>
                    <Input placeholder="aiResponse1" {...field} />
                  </FormControl>
                  <FormDescription>
                    Use this name to reference the result of this node in
                    subsequent nodes.
                    <code>{`{{${
                      watchVariableName ? watchVariableName : "varName"
                    }.response}}`}</code>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell me a joke about a cat."
                      className="resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The prompt to send to the {providerName} model. You can use
                    variables.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
                type="submit"
                form="ai-provider-form"
                className="mt-4"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

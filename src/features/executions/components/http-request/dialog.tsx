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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  endpoint: z.string().min(1, {
    message: "Endpoint is required",
  }),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  body: z.string().optional(),
  //.refine(),TODO: add body validation
});

export type HttpRequestFormValues = z.infer<typeof formSchema>;
type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  defaultValues?: Partial<HttpRequestFormValues>;
};

const getDefaultValues = (
  defaultValues?: Partial<HttpRequestFormValues>
): HttpRequestFormValues => ({
  variableName: defaultValues?.variableName ?? "",
  endpoint: defaultValues?.endpoint ?? "",
  method: defaultValues?.method ?? "GET",
  body: defaultValues?.body ?? "",
});

export const HttpRequestDialog = ({
  defaultValues,
  open,
  onOpenChange,
  onSubmit,
}: Props) => {
  const form = useForm<HttpRequestFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(defaultValues),
  });

  useEffect(() => {
    if (open) {
      form.reset(getDefaultValues(defaultValues));
    }
  }, [open, defaultValues, form]);

  function handleSubmit(data: HttpRequestFormValues) {
    onSubmit(data);
    onOpenChange(false);
  }
  const methodValue = form.watch("method");
  const watchVariableName = form.watch("variableName");

  const showBody = ["POST", "PUT", "PATCH"].includes(methodValue);

  useEffect(() => {
    if (!showBody) {
      form.setValue("body", "");
    }
  }, [showBody]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>HTTP Request</DialogTitle>
          <DialogDescription>
            Configure settings for the HTTP request node
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="http-request-form"
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
                    <Input placeholder="httpRequest1" {...field} />
                  </FormControl>
                  <FormDescription>
                    Use this name to referecn the result of this node in
                    subsequent nodes.
                    <code>{`{{${
                      watchVariableName ? watchVariableName : "varName"
                    }.httpResponse.data.id}}`}</code>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Http request method to use.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endpoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endpoint URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/api/{{httpResponse.data.id}}"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Static URL or use {"{{variables}}"} for simple values or{" "}
                    {"{{json variable}}"} to stringify objects
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showBody && (
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={JSON.stringify(
                          {
                            userId: "{{httpResponse.data.id}}",
                            name: "{{httpResponse.data.name}}",
                            items: "{{httpResponse.data.items}}",
                          },
                          null,
                          2
                        )}
                        className="resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      JSON with template variables. Use {"{{variables}}"} for
                      simple values or {"{{json variable}}"} to stringify
                      objects.
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
                type="submit"
                form="http-request-form"
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

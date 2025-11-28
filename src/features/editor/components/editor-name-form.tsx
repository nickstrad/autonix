"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateWorkflowName } from "@/features/workflows/hooks/use-update-workflow-name";
import { useEffect, useState, useRef } from "react";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflow";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
});

type FormValues = z.infer<typeof formSchema>;

type EditorNameFormProps = {
  workflowId: string;
};

export const EditorNameForm = ({ workflowId }: EditorNameFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: workflow } = useSuspenseWorkflow({ id: workflowId });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: workflow?.name ?? "",
    },
  });

  useEffect(() => {
    if (workflow?.name) {
      form.reset({ name: workflow.name });
    }
  }, [workflow?.name, form]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const { mutate, isPending } = useUpdateWorkflowName();

  const onSubmit = (data: FormValues) => {
    if (data.name === workflow?.name || isPending) {
      setIsEditing(false);
      return;
    }

    mutate(
      { id: workflowId, name: data.name },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
        onError: () => {
          form.reset({ name: workflow?.name });
          setIsEditing(false);
        },
      }
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      form.reset({ name: workflow?.name });
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    if (isPending) {
      return;
    }

    form.reset({ name: workflow?.name });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    ref={inputRef}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className="w-60 h-8"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isPending && <Spinner className="size-4" />}
        </form>
      </Form>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setIsEditing(true);
        }
      }}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 h-8 w-60",
        "font-semibold text-lg hover:bg-muted rounded-md cursor-pointer transition-colors"
      )}
    >
      {workflow?.name}
    </div>
  );
};

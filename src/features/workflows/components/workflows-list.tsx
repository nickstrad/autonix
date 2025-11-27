"use client";
import { useSuspenseWorkflows } from "../hooks/use-workflows";

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

  function pretty(json: any) {
    return JSON.stringify(json, null, 2)
      .replace(/"(.*?)":/g, '<span class="text-blue-500">"$1"</span>:')
      .replace(/: "(.*?)"/g, ': <span class="text-green-600">"$1"</span>');
  }

  return (
    <div className="flex-1 flex justify-center items-center p-4">
      <pre
        className="text-sm whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: pretty(workflows.data.items) }}
      />
    </div>
  );
};

"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogDescription } from "@radix-ui/react-dialog";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const GoogleFormTriggerDialog = ({ open, onOpenChange }: Props) => {
  const params = useParams();
  const workflowId = params?.workflowId;

  // construct webhook url
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const webhookUrl = `${baseUrl}/api/webhooks/google-form/${workflowId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(webhookUrl);
      toast.success("Webhook URL copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy webhook URL");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Google Form Trigger Configuration</DialogTitle>
          <DialogDescription>
            Use this webhook URL in your google Form's Apps Script to trigger
            this workflow when a form is submitted.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <div className="flex items-center gap-2">
              <Input
                id="webhook-url"
                value={webhookUrl}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={copyToClipboard}
              >
                Copy
              </Button>
            </div>
          </div>
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <h4 className="font-medium">Setup instructions:</h4>
            <Button variant="link">
              <Link href="https://www.svix.com/resources/guides/google-forms-webhook/">
                Google Form Webhook tutorial
              </Link>
            </Button>
          </div>
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <h4 className="font-medium text-sm">Available Variables:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>
                <code className="bg-background px-1 py-0.5 rounded">
                  {"{{googleForm.respondentEmail}}"}
                </code>
                - Respondent's email
              </li>
              <li>
                <code className="bg-background px-1 py-0.5 rounded">
                  {"{{googleForm.responses['Question Name']}}"}
                </code>
                - Specific answer
              </li>
              <li>
                <code className="bg-background px-1 py-0.5 rounded">
                  {"{{ json googleForm.responses }}"}
                </code>
                - All responses as json
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AppLogo } from "@/components/app/AppLogo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, FileX2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto">
            <AppLogo height={60} width={60} />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold text-destructive">
            Oops! Something went wrong.
          </CardTitle>
          <CardDescription>
            We encountered an unexpected error. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center rounded-md border border-destructive/20 bg-destructive/10 p-4">
            <AlertTriangle className="mr-3 h-6 w-6 text-destructive" />
            <p className="text-sm font-medium text-destructive">
              {error.message || "An unknown error occurred."}
            </p>
          </div>
          <Accordion className="mt-4 w-full" collapsible type="single">
            <AccordionItem value="error-details">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <FileX2 className="size-4" />
                  <span className="text-sm">Error Details</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="rounded-md bg-muted p-4 text-sm">
                  <p className="font-semibold">Digest: {error.digest}</p>
                  <pre className="mt-2 whitespace-pre-wrap break-words text-xs">
                    {error.stack}
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button onClick={() => reset()}>Try Again</Button>
          <Button asChild variant="outline">
            <Link href="/">Go to Homepage</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

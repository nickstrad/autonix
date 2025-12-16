import { NonRetriableError } from "inngest";
import axios, { AxiosRequestConfig } from "axios";
import { INNGEST_EVENTS } from "@/inngest/functions";
import { NodeExecutor } from "@/features/executions/types";
import { HttpRequestNodeData } from "./node";

export const httpRequestExecutor: NodeExecutor<HttpRequestNodeData> = async ({
  context,
  step,
  data: { variableName, endpoint, method, body },
}) => {
  if (!endpoint) {
    //TODO: publish error state for http request
    throw new NonRetriableError("HTTP Request node: No endpoint configured");
  }

  if (!variableName) {
    //TODO: publish error state for http request
    throw new NonRetriableError(
      "HTTP Request node: No variable name configured"
    );
  }

  // TODO: Publish 'loading' state for http request
  const result = await step.run(INNGEST_EVENTS.HTTP_REQUEST.NAME, async () => {
    let options: AxiosRequestConfig = {
      method: method ?? "GET",
    };

    if (["PATCH", "POST", "PUT"].includes(options.method ?? "")) {
      //TODO: parse values given by user
      options.data = body;
      options.headers = {
        "Content-Type": "application/json",
      };
    }

    const results = await axios(endpoint, options);

    const responsePayload = {
      httpResponse: {
        status: results.status,
        statusText: results.statusText,
        // headers: Object.fromEntries(results.headers.entries()),
        data: results.data ?? results.statusText,
      },
    };

    return {
      ...context,
      [variableName]: responsePayload,
    };
  });

  // TODO: Publish 'success' state for  http request
  return result;
};

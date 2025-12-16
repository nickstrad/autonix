import { NodeExecutor } from "@/features/executions/types";
import { INNGEST_EVENTS } from "@/inngest/functions";
import { HttpRequestNodeData } from "./node";
import { NonRetriableError } from "inngest";
import axios, { AxiosRequestConfig } from "axios";

export const httpRequestExecutor: NodeExecutor<HttpRequestNodeData> = async ({
  nodeId,
  context,
  step,
  data: { endpoint, method, body },
}) => {
  if (!endpoint) {
    //TODO: publish error state for http request
    throw new NonRetriableError("HTTP Request node: No endpoint configured");
  }

  // TODO: Publish 'loading' state for http request
  const result = await step.run(INNGEST_EVENTS.HTTP_REQUEST.NAME, async () => {
    let options: AxiosRequestConfig = {
      method: method ?? "GET",
    };

    if (["PATCH", "POST", "PUT"].includes(options.method ?? "")) {
      //TODO: parse values given by user
      options.data = body;
    }

    const results = await axios(endpoint, options);

    return {
      ...context,
      [nodeId]: {
        status: results.status,
        statusText: results.statusText,
        // headers: Object.fromEntries(results.headers.entries()),
        data: results.data ?? results.statusText,
      },
    };
  });

  // TODO: Publish 'success' state for  http request
  return result;
};

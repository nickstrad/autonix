import { NonRetriableError } from "inngest";
import axios, { AxiosRequestConfig } from "axios";
import { INNGEST_EVENTS } from "@/inngest/functions";
import { NodeExecutor } from "@/features/executions/types";
import { HttpRequestNodeData } from "./node";
import Handlebars from "handlebars";

Handlebars.registerHelper("json", (context) => {
  const stringifiedData = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(stringifiedData);
  return safeString;
});

export const httpRequestExecutor: NodeExecutor<HttpRequestNodeData> = async ({
  context,
  step,
  data: { variableName, endpoint, method, body },
}) => {
  [
    [endpoint, "endpoint"],
    [variableName, "variableName"],
    [method, "method"],
  ].forEach(([value, name]) => {
    if (!value) {
      //TODO: publish error state for http request

      throw new NonRetriableError(`HTTP Request node: No ${name} configured`);
    }
  });

  // TODO: Publish 'loading' state for http request
  const result = await step.run(INNGEST_EVENTS.HTTP_REQUEST.NAME, async () => {
    let options: AxiosRequestConfig &
      Required<Pick<AxiosRequestConfig, "method">> = {
      method,
    };

    if (["PATCH", "POST", "PUT"].includes(options.method)) {
      const interpolatedBody = Handlebars.compile(body ?? "{}")(context);
      JSON.parse(interpolatedBody); // Validate JSON

      options.data = interpolatedBody;
      options.headers = {
        "Content-Type": "application/json",
      };
    }

    const interpolatedEndpoint = Handlebars.compile(endpoint)(context);

    const results = await axios(interpolatedEndpoint, options);

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

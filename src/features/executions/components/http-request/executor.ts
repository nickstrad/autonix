import { NonRetriableError } from "inngest";
import axios, { AxiosRequestConfig } from "axios";
import { NodeExecutor } from "@/features/executions/types";
import { HttpRequestNodeData } from "./node";
import Handlebars from "handlebars";
import { httpRequestChannel } from "@/inngest/channels/http-request";
import { INNGEST_EVENTS } from "@/lib/constants";

Handlebars.registerHelper("json", (context) => {
  const stringifiedData = JSON.stringify(context, null, 2);
  const safeString = new Handlebars.SafeString(stringifiedData);
  return safeString;
});

export const httpRequestExecutor: NodeExecutor<HttpRequestNodeData> = async ({
  context,
  step,
  data: { variableName, endpoint, method, body },
  nodeId,
  publish,
}) => {
  await publish(
    httpRequestChannel().status({
      nodeId,
      status: "loading",
    })
  );

  [
    [endpoint, "endpoint"],
    [variableName, "variableName"],
    [method, "method"],
  ].forEach(async ([value, name]) => {
    if (!value) {
      await publish(
        httpRequestChannel().status({
          nodeId,
          status: "error",
        })
      );
      throw new NonRetriableError(`HTTP Request node: No ${name} configured`);
    }
  });

  try {
    const result = await step.run(
      INNGEST_EVENTS.HTTP_REQUEST.NAME,
      async () => {
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

        if (!interpolatedEndpoint || typeof interpolatedEndpoint !== "string") {
          throw new NonRetriableError(
            `HTTP Request node: Invalid endpoint URL`
          );
        }
        const results = await axios(interpolatedEndpoint, options);

        const responsePayload = {
          httpResponse: {
            status: results.status,
            statusText: results.statusText,
            // headers: Object.fromEntries(results.headers.entries()),
            data: results.data ?? results.statusText,
          },
        };

        await publish(
          httpRequestChannel().status({
            nodeId,
            status: "success",
          })
        );

        return {
          ...context,
          [variableName]: responsePayload,
        };
      }
    );

    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "success",
      })
    );

    return result;
  } catch (error) {
    await publish(
      httpRequestChannel().status({
        nodeId,
        status: "error",
      })
    );
    throw error;
  }
};

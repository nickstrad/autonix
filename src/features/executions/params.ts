import { PAGINATION } from "@/lib/constants";
import { parseAsInteger, parseAsString } from "nuqs/server";

export const EXECUTIONS_PARAMS = {
  page: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
    .withOptions({ clearOnDefault: true }),
  status: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  sortBy: parseAsString.withDefault("createdAt"),
  sortOrder: parseAsString.withDefault("desc"),
  workflowId: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
};

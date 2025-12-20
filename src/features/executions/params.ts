import { PAGINATION } from "@/lib/constants";
import { parseAsInteger, parseAsString, parseAsStringLiteral } from "nuqs/server";

export const EXECUTIONS_PARAMS = {
  page: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
    .withOptions({ clearOnDefault: true }),
  status: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  sortBy: parseAsString.withDefault("createdAt"),
  sortOrder: parseAsStringLiteral(["asc", "desc"] as const).withDefault("desc"),
  workflowId: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
};

import { WORKFLOWS_PARAMS } from "../params";
import { useQueryStates } from "nuqs";

export const useWorkflowParams = () => {
  return useQueryStates(WORKFLOWS_PARAMS);
};

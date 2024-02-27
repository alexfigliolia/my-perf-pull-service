import { AsyncServiceRequest, setJobStatus } from "GQL/AsyncService";
import type {
  SetJobStatusMutation,
  SetJobStatusMutationVariables,
} from "GQL/AsyncService/Types";
import { JobStatus } from "GQL/AsyncService/Types";
import type { BasePull } from "./types";

export abstract class Pull<T extends any[], O extends BasePull> {
  options: O;
  status: JobStatus = JobStatus.Pending;
  public static activePull: null | Pull<any, any> = null;
  constructor(options: O) {
    this.options = options;
  }

  abstract pull(): Promise<Pull<T, O>>;

  abstract nextPage(): Promise<T>;

  abstract onComplete(): Promise<void>;

  protected setJobStatus() {
    return AsyncServiceRequest<
      SetJobStatusMutation,
      SetJobStatusMutationVariables
    >({
      query: setJobStatus,
      variables: {
        id: this.options.id,
        status: this.status,
      },
    });
  }
}

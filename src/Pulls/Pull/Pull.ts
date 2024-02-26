import { AsyncServiceRequest, setJobStatus } from "GQL/AsyncService";
import type {
  SetJobStatusMutation,
  SetJobStatusMutationVariables,
} from "GQL/AsyncService/Types";
import { JobStatus } from "GQL/AsyncService/Types";
import type { Options } from "./types";

export abstract class Pull<T extends any[]> {
  options: Options;
  currentPage: number;
  data = [] as unknown as T;
  status: JobStatus = JobStatus.Pending;
  public static activePull: null | Pull<any> = null;
  constructor(options: Options) {
    this.options = options;
    this.currentPage = options.currentPage;
  }

  public async pull(): Promise<Pull<T>> {
    Pull.activePull = this;
    try {
      const results = await this.nextPage();
      this.data.push(...results);
      const { length: size } = results;
      if (size && size === this.options.pageSize) {
        return this.pull();
      }
      this.status = JobStatus.Complete;
    } catch (error) {
      this.status = JobStatus.Failed;
    }
    Pull.activePull = null;
    return this;
  }

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

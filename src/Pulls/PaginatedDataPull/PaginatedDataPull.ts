import { JobStatus } from "GQL/AsyncService/Types";
import { Pull } from "Pulls/Pull";
import type { PaginatedPullOptions as Options } from "./types";

export abstract class PaginatedDataPull<T extends any[]> extends Pull<
  T,
  Options
> {
  currentPage: number;
  data = [] as unknown as T;
  constructor(options: Options) {
    super(options);
    this.currentPage = options.currentPage;
  }

  public async pull(): Promise<Pull<T, Options>> {
    Pull.activePull = this;
    this.status = JobStatus.Inprogress;
    try {
      const results = await this.nextPage();
      this.data.push(...results);
      this.currentPage++;
      const { length: size } = results;
      if (size && size === this.options.pageSize) {
        await this.pull();
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
}

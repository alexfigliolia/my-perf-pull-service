import { Pull } from "@alexfigliolia/my-performance-async";
import { JobStatus } from "GQL/AsyncService/Types";
import type { PaginatedPullOptions as Options } from "./types";

export abstract class PaginatedDataPull<T extends any[]> extends Pull<Options> {
  currentPage: number;
  data = [] as unknown as T;
  constructor(options: Options) {
    super(options);
    this.currentPage = options.currentPage;
  }

  public async pull(): Promise<Pull<Options>> {
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

  abstract pushResultsToCore(): Promise<void>;
}

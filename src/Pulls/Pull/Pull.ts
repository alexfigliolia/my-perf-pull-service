import type { Options, Status } from "./types";

export abstract class Pull<T extends any[]> {
  options: Options;
  currentPage: number;
  data = [] as unknown as T;
  status: Status = "in-progress";
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
        await this.pull();
      } else {
        this.status = "success";
      }
    } catch (error) {
      this.status = "fail";
    }
    Pull.activePull = null;
    return this;
  }

  abstract nextPage(): Promise<T>;
}

import { Environment } from "Environment";
import { GQLClient } from "GQL/Client";
import type { JobServiceOptions } from "./types";

export class JobServiceClient<
  D,
  V extends Record<string, any> = Record<string, any>,
> extends GQLClient<D, V> {
  constructor(options: JobServiceOptions<V>) {
    super({
      url: `${Environment.JOB_SERVICE_URL}/graphql`,
      ...options,
    });
  }
}

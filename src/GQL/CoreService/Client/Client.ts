import { Environment } from "Environment";
import { GQLClient } from "GQL/Client";
import type { CoreServiceOptions } from "./types";

export class CoreServiceClient<
  D,
  V extends Record<string, any> = Record<string, any>,
> extends GQLClient<D, V> {
  constructor(options: CoreServiceOptions<V>) {
    super({
      url: `${Environment.CORE_SERVICE_URL}/graphql`,
      ...options,
    });
  }
}

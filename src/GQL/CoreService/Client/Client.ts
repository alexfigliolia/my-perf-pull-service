import { GQLClient } from "@figliolia/graphql-client";
import { Environment } from "Environment";
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

import { GQLSubscription } from "@figliolia/graphql-client";
import { Environment } from "Environment";

export class AsyncServiceSubscription<
  D,
  V extends Record<string, any> = Record<string, any>,
> extends GQLSubscription<D, V> {
  constructor(query: string, variables: V) {
    super({
      query,
      variables,
      url: `${Environment.ASYNC_SERVICE_URL}/graphql`,
    });
  }
}

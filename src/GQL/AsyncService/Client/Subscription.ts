import { Environment } from "Environment";
import { GQLSubscription } from "GQL/Client";

export class AsyncServiceSubscription<
  D,
  V extends Record<string, any> = Record<string, any>,
> extends GQLSubscription<D, V> {
  constructor(query: string, variables: V) {
    super(`${Environment.ASYNC_SERVICE_URL}/graphql`, query, variables);
  }
}

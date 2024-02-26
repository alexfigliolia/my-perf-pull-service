import { CoreServiceClient } from "./Client";
import type { CoreServiceOptions } from "./types";

export const CoreServiceRequest = <
  D,
  V extends Record<string, any> = Record<string, any>,
>(
  options: CoreServiceOptions<V>,
) => {
  const client = new CoreServiceClient<D, V>(options);
  return client.request();
};

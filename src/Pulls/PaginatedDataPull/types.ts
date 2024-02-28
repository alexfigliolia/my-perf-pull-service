import type { Platform, RequestMethod } from "GQL/AsyncService/Types";

export interface PaginatedPullOptions {
  id: number;
  token: string;
  api_url: string;
  pageSize: number;
  platform: Platform;
  currentPage: number;
  organizationId: number;
  requestMethod: RequestMethod;
}

import type { Platform } from "Pulls/types";

export interface PaginatedPullOptions {
  id: number;
  token: string;
  api_url: string;
  pageSize: number;
  platform: Platform;
  currentPage: number;
  organizationId: number;
  requestMethod: "GET" | "POST";
}

import type { Platform } from "GQL/CoreService/Types";

export interface IRepository {
  name: string;
  api_url: string;
  html_url: string;
  clone_url: string;
  created_at: string;
  updated_at: string;
  platform: Platform;
  platform_id: number;
  organizationId: number;
  language: string | null;
  description: string | null;
}

import type { Platform } from "Pulls/types";

export interface MPRepository {
  name: string;
  api_url: string;
  html_url: string;
  clone_url: string;
  created_at: string;
  updated_at: string;
  platform: Platform;
  platform_id: number;
  language: string | null;
  description: string | null;
}

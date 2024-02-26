import nodeFetch from "node-fetch";
import type { GithubAPIError } from "./types";

export class API {
  public static async wrapGet<T>(url: string, token: string) {
    const response = await nodeFetch(url, {
      method: "GET",
      headers: this.createHeaders(token),
    });
    return response.json() as unknown as T | GithubAPIError;
  }

  public static async wrapPost<T>(url: string, token: string) {
    const response = await nodeFetch(url, {
      method: "POST",
      headers: this.createHeaders(token),
    });
    return response.json() as unknown as T | GithubAPIError;
  }

  public static createHeaders(token: string) {
    return {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
  }
}

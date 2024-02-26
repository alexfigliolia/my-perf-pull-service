export interface GithubAPIError {
  message: string;
  documentation_url: string;
}

export interface IRepositoryQuery {
  url: string;
  page: number;
  size: number;
  token: string;
}

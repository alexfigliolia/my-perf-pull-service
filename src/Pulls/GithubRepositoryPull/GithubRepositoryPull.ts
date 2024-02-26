import type { Repository } from "@octokit/webhooks-types";
import { API } from "Github";
import { Errors } from "Github/Errors";
import type { Platform } from "Pulls/Pull";
import { Pull } from "Pulls/Pull";
import type { MPRepository } from "Schema/Resolvers/Repository/types";

export class GithubRepositoryPull extends Pull<MPRepository[]> {
  public async nextPage() {
    const { pageSize: size, token, api_url: url } = this.options;
    const params = new URLSearchParams({
      page: this.currentPage.toString(),
      per_page: size.toString(),
    });
    const response = await API.wrapGet<Repository[]>(
      `${url}?${params.toString()}`,
      token,
    );
    if (Errors.isAPIEror(response)) {
      throw response;
    }
    return response.map(repo => this.transform(repo));
  }

  private transform(repository: Repository) {
    return {
      name: repository.name,
      api_url: repository.url,
      platform_id: repository.id,
      html_url: repository.html_url,
      language: repository.language,
      platform: "github" as Platform,
      clone_url: repository.clone_url,
      description: repository.description,
      created_at: repository.created_at.toString(),
      updated_at: repository.updated_at.toString(),
    };
  }
}

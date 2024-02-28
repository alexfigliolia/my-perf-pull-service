import { CoreServiceRequest } from "@alexfigliolia/my-performance-clients";
import type { Repository } from "@octokit/webhooks-types";
import { API } from "Github";
import { Errors } from "Github/Errors";
import { setOrganizationRepositories } from "GQL";
import { JobStatus } from "GQL/AsyncService/Types";
import type {
  SetOrganizationRepositoriesMutation,
  SetOrganizationRepositoriesMutationVariables,
} from "GQL/CoreService/Types";
import { Platform } from "GQL/CoreService/Types";
import { PaginatedDataPull } from "Pulls/PaginatedDataPull";
import type { IRepository } from "./types";

export class GithubRepositoryPull extends PaginatedDataPull<IRepository[]> {
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
      platform: Platform.Github,
      platform_id: repository.id,
      html_url: repository.html_url,
      language: repository.language,
      clone_url: repository.clone_url,
      description: repository.description,
      organizationId: this.options.organizationId,
      created_at: repository.created_at.toString(),
      updated_at: repository.updated_at.toString(),
    };
  }

  public async pushResultsToCore() {
    try {
      await CoreServiceRequest<
        SetOrganizationRepositoriesMutation,
        SetOrganizationRepositoriesMutationVariables
      >({
        query: setOrganizationRepositories,
        variables: {
          repositories: this.data,
          organizationId: this.options.organizationId,
        },
      });
    } catch (error) {
      this.status = JobStatus.Failed;
    }
  }
}

import type { Repository } from "@octokit/webhooks-types";
import { API } from "Github";
import { Errors } from "Github/Errors";
import { setOrganizationRepositories } from "GQL";
import { CoreServiceRequest } from "GQL/CoreService/Client/Request";
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

  public async onComplete() {
    await this.pushRepositoriesToCore();
    await this.setJobStatus();
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

  private pushRepositoriesToCore() {
    return CoreServiceRequest<
      SetOrganizationRepositoriesMutation,
      SetOrganizationRepositoriesMutationVariables
    >({
      query: setOrganizationRepositories,
      variables: {
        repositories: this.data,
        organizationId: this.options.organizationId,
      },
    });
  }
}

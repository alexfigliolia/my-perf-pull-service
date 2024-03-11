import { BaseSubscription } from "@alexfigliolia/my-performance-async";
import { AsyncServiceRequest } from "@alexfigliolia/my-performance-clients";
import { nextRepositoryPullJob } from "GQL";
import {
  type NextRepositoryPullJobQuery,
  type NextRepositoryPullJobQueryVariables,
  Platform,
} from "GQL/AsyncService/Types";
import { GithubRepositoryPull } from "Pulls";
import type { Config, IncomingJob } from "./types";

export class RepositoryPulls extends BaseSubscription<
  Config,
  GithubRepositoryPull
> {
  public initialize() {
    void this.poll();
    return this;
  }

  public async poll() {
    try {
      const response = await AsyncServiceRequest<
        NextRepositoryPullJobQuery,
        NextRepositoryPullJobQueryVariables
      >({
        query: nextRepositoryPullJob,
        variables: {},
      });
      const config = this.parseResponse(response.data.nextRepositoryPullJob);
      this.onPoll(config);
    } catch (error) {
      this.activatePollInterval();
    }
  }

  public createPull(job: Config) {
    if (job.platform === Platform.Github) {
      return new GithubRepositoryPull(job);
    }
    throw new Error("Not implemented");
  }

  private parseResponse(job: IncomingJob) {
    const { jobId, ...rest } = job;
    return { id: jobId, ...rest };
  }
}

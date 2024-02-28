import { BaseSubscription } from "@alexfigliolia/my-performance-async";
import {
  AsyncServiceRequest,
  AsyncServiceSubscription,
} from "@alexfigliolia/my-performance-clients";
import { nextRepositoryPullJob, repositoryPulls } from "GQL";
import {
  type NextRepositoryPullJobQuery,
  type NextRepositoryPullJobQueryVariables,
  Platform,
  type RepositoryPullsSubscription,
  type RepositoryPullsSubscriptionVariables,
} from "GQL/AsyncService/Types";
import { GithubRepositoryPull } from "Pulls";
import type { Config, IncomingJob } from "./types";

export class RepositoryPulls extends BaseSubscription<
  Config,
  GithubRepositoryPull
> {
  public stream = new AsyncServiceSubscription<
    RepositoryPullsSubscription,
    RepositoryPullsSubscriptionVariables
  >(repositoryPulls, {});

  public initialize() {
    void this.poll();
    this.stream.open();
    this.stream.onData(response => {
      if (!response.data?.repositoryPulls) {
        return;
      }
      const { repositoryPulls: next } = response.data;
      if (next) {
        const config = this.parseResponse(next);
        this.onStream(config);
      }
    });
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
      this.onPoll(null);
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

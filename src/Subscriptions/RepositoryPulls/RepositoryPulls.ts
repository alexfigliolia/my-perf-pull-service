import {
  AsyncServiceRequest,
  AsyncServiceSubscription,
  nextPullJob,
  repositoryPulls,
} from "GQL";
import type {
  NextPullJobQuery,
  NextPullJobQueryVariables,
  RepositoryPullsSubscription,
  RepositoryPullsSubscriptionVariables,
} from "GQL/AsyncService/Types";
import { Platform } from "GQL/AsyncService/Types";
import { GithubRepositoryPull } from "Pulls";
import { BaseSubscription } from "Subscriptions/BaseSubscription";
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
        NextPullJobQuery,
        NextPullJobQueryVariables
      >({
        query: nextPullJob,
        variables: {},
      });
      const config = this.parseResponse(response.data.nextPullJob);
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

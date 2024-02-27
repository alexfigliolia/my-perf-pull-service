import type { GQLSubscription } from "@figliolia/graphql-client";
import { AsyncServiceRequest, setJobStatus } from "GQL";
import {
  JobStatus,
  type SetJobStatusMutation,
  type SetJobStatusMutationVariables,
} from "GQL/AsyncService/Types";
import type { BasePull, Pull } from "Pulls/Pull";
import type { Activity } from "./types";

export abstract class BaseSubscription<
  P extends BasePull,
  T extends Pull<any, any>,
> {
  private closed = false;
  public activity: Activity = "poll";
  abstract stream: GQLSubscription<any, any>;

  abstract initialize(): BaseSubscription<P, T>;

  abstract poll(): Promise<void>;

  abstract createPull(job: P): T;

  public destroy() {
    this.stream.closeAll();
    this.closed = true;
  }

  public onPoll(job?: P | null) {
    if (!job) {
      this.activity = "stream";
    } else {
      this.activity = "poll";
      const pull = this.createPull(job);
      void this.enqueue(pull);
    }
  }

  public onStream(job?: P) {
    if (this.activity !== "stream" || !job) {
      return;
    }
    void AsyncServiceRequest<
      SetJobStatusMutation,
      SetJobStatusMutationVariables
    >({
      query: setJobStatus,
      variables: {
        id: job.id,
        status: JobStatus.Inprogress,
      },
    });
    const pull = this.createPull(job);
    void this.enqueue(pull);
  }

  public async enqueue(pull: T) {
    const puller = await pull.pull();
    await puller.onComplete();
    if (!this.closed) {
      return this.poll();
    }
  }
}

import type { GQLSubscription } from "GQL";
import type { Pull } from "Pulls/Pull";
import type { Activity } from "./types";

export abstract class BaseSubscription<P, T extends Pull<any>> {
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
    if (this.activity === "stream") {
      if (!job) {
        return;
      }
      const pull = this.createPull(job);
      void this.enqueue(pull);
    }
  }

  public async enqueue(pull: T) {
    const puller = await pull.pull();
    await puller.onComplete();
    if (!this.closed) {
      return this.poll();
    }
  }
}

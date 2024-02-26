import type { BaseSubscription } from "./BaseSubscription";
import { RepositoryPulls } from "./RepositoryPulls";

export class Subscriptions {
  private static initialized = false;
  public static readonly Streams = [RepositoryPulls];
  public static instances: BaseSubscription<any, any>[] = [];

  public static initialize() {
    if (this.initialized) {
      return;
    }
    for (const Stream of this.Streams) {
      this.instances.push(new Stream().initialize());
    }
  }

  public static destroy() {
    this.instances.forEach(instance => {
      instance.destroy();
    });
    this.instances = [];
  }
}

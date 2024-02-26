import type { Client, ExecutionResult } from "graphql-sse";
import { createClient } from "graphql-sse";
import { HTTPClient } from "@figliolia/http";

export class GQLSubscription<
  D,
  V extends Record<string, any> = Record<string, any>,
> extends HTTPClient<ExecutionResult<D, V>> {
  variables: V;
  query: string;
  private Client?: Client<false>;
  internalUnsusbscribe?: () => void;
  constructor(destination: string, query: string, variables: V) {
    super(destination);
    this.query = query;
    this.variables = variables;
  }

  public open() {
    if (!this.Client) {
      this.Client = createClient({
        url: this.destination,
        credentials: "include",
      });
    }
    if (this.internalUnsusbscribe) {
      this.internalUnsusbscribe();
    }
    this.internalUnsusbscribe = this.Client.subscribe<D, V>(
      {
        query: this.query,
        variables: this.variables,
      },
      this.Sink,
    );
  }

  public close() {
    if (this.internalUnsusbscribe) {
      this.internalUnsusbscribe();
    }
    this.unsubscribe();
  }

  public closeAll() {
    if (!this.Client) {
      return;
    }
    this.close();
    this.Client.dispose();
    this.Client = undefined;
  }

  private get Sink() {
    return {
      next: (data: ExecutionResult<D, V>) => {
        this.emit("on-data", data);
      },
      error: (error: unknown) => {
        this.emit(
          "on-error",
          new Error("GQL GQLSubscription Error", { cause: error }),
        );
      },
      complete: () => {},
    };
  }
}

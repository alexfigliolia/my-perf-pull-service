import type { RepositoryPullJob } from "GQL/AsyncService/Types";

export type Config = Omit<RepositoryPullJob, "jobId">;

export type IncomingJob = Omit<RepositoryPullJob, "id">;

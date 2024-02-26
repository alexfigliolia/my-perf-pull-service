import type { RepositoryPullJob } from "GQL";

export type Config = Omit<RepositoryPullJob, "jobId">;

export type IncomingJob = Omit<RepositoryPullJob, "id">;

import { gql } from "graphql-request";

export const nextRepositoryPullJob = gql`
  query nextRepositoryPullJob {
    nextRepositoryPullJob {
      jobId
      api_url
      token
      platform
      currentPage
      pageSize
      organizationId
      requestMethod
    }
  }
`;

import { gql } from "graphql-request";

export const nextPullJob = gql`
  query nextPullJob {
    nextPullJob {
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

import { gql } from "graphql-request";

export const pullSubscription = gql`
  subscription repositoryPulls {
    repositoryPulls {
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

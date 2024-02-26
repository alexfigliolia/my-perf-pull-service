/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  registerRepositoryPull: Scalars['Int']['output'];
  registerRepositoryStatsPull: Scalars['Int']['output'];
};


export type MutationRegisterRepositoryPullArgs = {
  api_url: Scalars['String']['input'];
  organizationId: Scalars['Int']['input'];
  platform: Platform;
  requestMethod: RequestMethod;
  token: Scalars['String']['input'];
};


export type MutationRegisterRepositoryStatsPullArgs = {
  clone_url: Scalars['String']['input'];
  organizationId: Scalars['Int']['input'];
  repositoryId: Scalars['Int']['input'];
  token: Scalars['String']['input'];
};

export enum Platform {
  Bitbucket = 'bitbucket',
  Github = 'github'
}

export type Query = {
  __typename?: 'Query';
  nextPullJob: RepositoryPullJob;
};

export type RepositoryPullJob = {
  __typename?: 'RepositoryPullJob';
  api_url: Scalars['String']['output'];
  currentPage: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  jobId: Scalars['Int']['output'];
  organizationId: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  platform: Platform;
  requestMethod: RequestMethod;
  token: Scalars['String']['output'];
};

export enum RequestMethod {
  Get = 'GET',
  Post = 'POST'
}

export type Subscription = {
  __typename?: 'Subscription';
  repositoryPulls: RepositoryPullJob;
};

export type NextPullJobQueryVariables = Exact<{ [key: string]: never; }>;


export type NextPullJobQuery = { __typename?: 'Query', nextPullJob: { __typename?: 'RepositoryPullJob', jobId: number, api_url: string, token: string, platform: Platform, currentPage: number, pageSize: number, organizationId: number, requestMethod: RequestMethod } };

export type RepositoryPullsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RepositoryPullsSubscription = { __typename?: 'Subscription', repositoryPulls: { __typename?: 'RepositoryPullJob', jobId: number, api_url: string, token: string, platform: Platform, currentPage: number, pageSize: number, organizationId: number, requestMethod: RequestMethod } };


export const NextPullJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"nextPullJob"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nextPullJob"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobId"}},{"kind":"Field","name":{"kind":"Name","value":"api_url"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"requestMethod"}}]}}]}}]} as unknown as DocumentNode<NextPullJobQuery, NextPullJobQueryVariables>;
export const RepositoryPullsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"repositoryPulls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repositoryPulls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobId"}},{"kind":"Field","name":{"kind":"Name","value":"api_url"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"requestMethod"}}]}}]}}]} as unknown as DocumentNode<RepositoryPullsSubscription, RepositoryPullsSubscriptionVariables>;
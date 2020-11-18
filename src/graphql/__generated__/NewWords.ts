/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NewWords
// ====================================================

export interface NewWords_allNewWords_edges_node {
  __typename: "UserWord";
  id: number;
  word: string;
  translation: string;
  example: string;
  forgottenTimes: number;
  rememberTimes: number;
}

export interface NewWords_allNewWords_edges {
  __typename: "UserWordEdge";
  node: NewWords_allNewWords_edges_node;
  cursor: string;
}

export interface NewWords_allNewWords_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface NewWords_allNewWords {
  __typename: "UserWordsPaginated";
  edges: NewWords_allNewWords_edges[] | null;
  pageInfo: NewWords_allNewWords_pageInfo;
  totalCount: number;
}

export interface NewWords {
  allNewWords: NewWords_allNewWords;
}

export interface NewWordsVariables {
  first: number;
  after?: string | null;
}

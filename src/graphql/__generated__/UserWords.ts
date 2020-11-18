/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserWords
// ====================================================

export interface UserWords_allUserWords_edges_node {
  __typename: "UserWord";
  id: number;
  word: string;
  translation: string;
  example: string;
  forgottenTimes: number;
  rememberTimes: number;
}

export interface UserWords_allUserWords_edges {
  __typename: "UserWordEdge";
  node: UserWords_allUserWords_edges_node;
  cursor: string;
}

export interface UserWords_allUserWords_pageInfo {
  __typename: "PageInfo";
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface UserWords_allUserWords {
  __typename: "UserWordsPaginated";
  edges: UserWords_allUserWords_edges[] | null;
  pageInfo: UserWords_allUserWords_pageInfo;
  totalCount: number;
}

export interface UserWords {
  allUserWords: UserWords_allUserWords;
}

export interface UserWordsVariables {
  first: number;
  after?: string | null;
}

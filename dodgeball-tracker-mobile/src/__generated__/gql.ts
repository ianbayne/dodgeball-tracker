/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query SearchPlayers($searchTerm: String) {\n    players(search: $searchTerm) {\n      id\n      firstName\n      lastName\n    }\n  }\n": types.SearchPlayersDocument,
    "\n  mutation CreateCatch($catcherId: ID!, $catcheeId: ID!) {\n    createCatch(input: { catcherId: $catcherId, catcheeId: $catcheeId }) {\n      catch {\n        id\n        catcher {\n          id\n        }\n        catchee {\n          id\n        }\n      }\n    }\n  }\n": types.CreateCatchDocument,
    "\n  mutation CreateHit($hitterId: ID!, $hitteeId: ID!) {\n    createHit(input: { hitterId: $hitterId, hitteeId: $hitteeId }) {\n      hit {\n        id\n        hitter {\n          id\n        }\n        hittee {\n          id\n        }\n      }\n    }\n  }\n": types.CreateHitDocument,
    "\n  query GetPlayers {\n    players {\n      id\n      firstName\n      lastName\n    }\n  }\n": types.GetPlayersDocument,
    "\n  query GetPlayer($id: ID!) {\n    player(id: $id) {\n      id\n      firstName\n      lastName\n    }\n  }\n": types.GetPlayerDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SearchPlayers($searchTerm: String) {\n    players(search: $searchTerm) {\n      id\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  query SearchPlayers($searchTerm: String) {\n    players(search: $searchTerm) {\n      id\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateCatch($catcherId: ID!, $catcheeId: ID!) {\n    createCatch(input: { catcherId: $catcherId, catcheeId: $catcheeId }) {\n      catch {\n        id\n        catcher {\n          id\n        }\n        catchee {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCatch($catcherId: ID!, $catcheeId: ID!) {\n    createCatch(input: { catcherId: $catcherId, catcheeId: $catcheeId }) {\n      catch {\n        id\n        catcher {\n          id\n        }\n        catchee {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateHit($hitterId: ID!, $hitteeId: ID!) {\n    createHit(input: { hitterId: $hitterId, hitteeId: $hitteeId }) {\n      hit {\n        id\n        hitter {\n          id\n        }\n        hittee {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateHit($hitterId: ID!, $hitteeId: ID!) {\n    createHit(input: { hitterId: $hitterId, hitteeId: $hitteeId }) {\n      hit {\n        id\n        hitter {\n          id\n        }\n        hittee {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPlayers {\n    players {\n      id\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  query GetPlayers {\n    players {\n      id\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPlayer($id: ID!) {\n    player(id: $id) {\n      id\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  query GetPlayer($id: ID!) {\n    player(id: $id) {\n      id\n      firstName\n      lastName\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
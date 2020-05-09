import * as React from "react";
import { getMainDefinition } from "@apollo/client/utilities";
import {
  from,
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  split
} from "@apollo/client";
import _withApollo from "next-with-apollo";
import { WebSocketLink } from "@apollo/link-ws";
import { OperationDefinitionNode } from "graphql";
import { setContext } from "@apollo/link-context";
import { Config } from "../config";
import { XHasuraClientName, AuthorizationHeader } from "../types";
import { AuthProvider } from "../auth";

export const AuthBearer = "Bearer";
const apolloRenderer = {
  render: ({ Page, props }) => (
    <ApolloProvider client={props.apollo}>
      <Page {...props} />
    </ApolloProvider>
  )
};

const splitLink = (httpLink: ApolloLink, wsLink: WebSocketLink): ApolloLink => split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;

    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createApolloHook = (auth: AuthProvider<any, any, any>) => _withApollo(
  ({ initialState }) => {

    const authLink = setContext((_, { headers }) => auth.getIdToken()
      .then((token) => ({
        headers: {
          [AuthorizationHeader]: token ? `${AuthBearer} ${token}` : null,
          ...headers
        }
      })));

    const httpLink = from([
      authLink,
      new HttpLink({
        uri: Config.httpDataHost,
        headers: {
          [XHasuraClientName]: Config.hasuraClientName
        }
      })
    ]);

    const wsLink = (): WebSocketLink => new WebSocketLink({
      uri: Config.wsDataHost,
      options: {
        reconnect: true,
        connectionParams: () => auth.getIdToken().then((token) => ({
          headers: {
            [AuthorizationHeader]: token ? `${AuthBearer} ${token}` : null,
            [XHasuraClientName]: Config.hasuraClientName
          }
        })),
        lazy: true,
        connectionCallback: (error) => {
          console.error("connection error: ", error);
        }
      }
    });

    return new ApolloClient({
      link: process.browser ? splitLink(httpLink, wsLink()) : httpLink,
      cache: new InMemoryCache().restore(initialState || {}),
      version: Config.version
    });
  },
  apolloRenderer
);

import * as React from "react";
import { getMainDefinition } from "@apollo/client/utilities";
import {
  from,
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split
} from "@apollo/client";
import _withApollo from "next-with-apollo";
import { WebSocketLink } from "@apollo/link-ws";
import { OperationDefinitionNode } from "graphql";
import { Config } from "../config";
import { XHasuraAdminSecret, XHasuraClientName } from "../types";

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

export const withApollo = _withApollo(
  ({ initialState }) => {

    const httpLink = createHttpLink({
      uri: Config.httpDataHost,
      headers: {
        [XHasuraClientName]: Config.hasuraClientName
      }
    });

    const wsLink = new WebSocketLink({
      uri: Config.wsDataHost,
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            [XHasuraClientName]: Config.hasuraClientName
          }
        }
      }
    });
    const link = splitLink(httpLink, wsLink);

    return new ApolloClient({
      link,
      cache: new InMemoryCache().restore(initialState || {})
    });
  },
  apolloRenderer
);

export const withAuthApollo = _withApollo(
  ({ initialState }) => {

    const authLink = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers }) => ({
        headers: {
          [XHasuraAdminSecret]: Config.adminSecret,
          [XHasuraClientName]: Config.hasuraClientName,
          ...headers
        }
      }));

      return forward(operation);
    });

    const httpLink = from([
      authLink,
      new HttpLink({
        uri: Config.httpDataHost
      })
    ]);

    const wsLink = new WebSocketLink({
      uri: Config.wsDataHost,
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            [XHasuraAdminSecret]: Config.adminSecret,
            [XHasuraClientName]: Config.hasuraClientName
          }
        }
      }
    });

    return new ApolloClient({
      link: splitLink(httpLink, wsLink),
      cache: new InMemoryCache().restore(initialState || {})
    });
  },
  apolloRenderer
);

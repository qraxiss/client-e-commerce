import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

import config from "@/config/config";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    queryDeduplication: false,
    link: new HttpLink({
      uri: config.serverUrl + "/graphql",
    }),

    defaultOptions: {
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      },
    },

    ssrMode: typeof window === "undefined",
    headers: {
      Authorization:
        "Bearer df47d9245bf34f3526011ebc02975e5a5f942d79a4ec7b0e12bf6d819d2dec95f12da2691df976afdacb9b6aa101299dcf47ad11f182993f4b2cd246e7378988f8034b11639b62da4cfab06fae83478c04b5068d59de102896795213e990ff83019384dd007b153dec92723233ac15c95b2653e8e547252b70700922d0df57d2",
    },
  });
});

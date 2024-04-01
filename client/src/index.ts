import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "cross-fetch";

const client = new ApolloClient({
	link: new HttpLink({ uri: process.env.PRODUCTION_GRAPHQL_URL, fetch }),
	cache: new InMemoryCache(),
});

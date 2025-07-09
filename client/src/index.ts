import {
	ApolloClient,
	gql,
	HttpLink,
	InMemoryCache,
} from "@apollo/client/core/index.js";
import fetch from "cross-fetch";

let URI = process.env.PRODUCTION_GRAPHQL_URL;

export const client = new ApolloClient({
	link: new HttpLink({ uri: 'https://hms.circles.clinic/graphql', fetch }),
	cache: new InMemoryCache(),
});

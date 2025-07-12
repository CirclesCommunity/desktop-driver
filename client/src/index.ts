import dotenv from 'dotenv';
dotenv.config();
import {
	ApolloClient,
	gql,
	HttpLink,
	InMemoryCache,
} from "@apollo/client/core/index.js";
import fetch from "cross-fetch";

console.log(`Apollo URL(client file): ${process.env.PRODUCTION_GRAPHQL_URL}`);
let URI = process.env.PRODUCTION_GRAPHQL_URL;


export const client = new ApolloClient({
	link: new HttpLink({ uri: URI, fetch }),
	cache: new InMemoryCache(),
});

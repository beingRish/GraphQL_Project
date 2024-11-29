import {
    ApolloServer,
    gql
} from 'apollo-server';

import {
    ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core';

import { users, quotes } from './fakedb.js';

const typeDefs = gql`
    type Query {
        users: [User]
        user(id: ID!): User
        quotes: [Quote]
        iquote(by: ID!): [Quote]
    }

    type User {
        id: ID!
        firstName: String
        lastName: String
        email: String
        password: String
        quotes: [Quote]
    }

    type Quote {
        name: String
        by: ID
    }
`

const resolvers = {
    Query: {
        users: () => users,
        user: (_, { id }) => users.find(user => user.id == id),
        quotes: () => quotes,
        iquote: (_, { by }) => quotes.filter(quote => quote.by == by) 
    },
    User: {
        quotes: (user) => quotes.filter(quote => quote.by == user.id)
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground
    ]
})

server.listen().then(({ url }) => {
    console.log(`
        🚀  Server is running
        📭  at ${url}
    `);
});
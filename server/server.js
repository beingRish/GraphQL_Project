import { 
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageDisabled
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schemaGQL.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 4000;
const app = express();
const httpServer = http.createServer(app);

if(process.env.NODE_ENV !=="production") {
    dotenv.config()
}

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected",() => {
    console.log("connected to mongodb")
})

mongoose.connection.on("error",(err) => {
    console.log("error connecting: ", err)
})

// import models here
import './models/Quotes.js'
import './models/User.js'

import resolvers from './resolvers.js';

// This is middleware
const context = ({ req }) => {
    const { authorization } = req.headers
    if(authorization) {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
        return { userId }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        process.env.NODE_ENV !=="production" ? 
        ApolloServerPluginLandingPageGraphQLPlayground() :
        ApolloServerPluginLandingPageDisabled()
    ]
})

if(process.env.NODE_ENV !=="production") {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    app.use(express.static('../client/build'))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

await server.start();
server.applyMiddleware({
    app,
    path:'/graphql'
});

httpServer.listen({ port }, () => {
    console.log(`🚀  Server is running📭  at 4000 ${server.graphqlPath}`);
});
import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'


async function main() {
    const app = express()
    const PORT = Number(process.env.PORT) || 8000
    app.use(express.json())
    const gqlServer = new ApolloServer({
        typeDefs: `
        type Query {
            hello: String!
            say(args: String): String!
        }`,
        resolvers: {
            Query: {
                hello: () => 'Hello World!',
                say: (_, { args }) => `Hello ${args}! how are you`
            }
        }

    })
    await gqlServer.start()
    app.get('/', (req, res) => {
        res.json({ message: "Server is up and running" })

    })
    app.use("/graphql",expressMiddleware(gqlServer))
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}
main()
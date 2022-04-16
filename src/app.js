import 'dotenv/config'
import express from 'express'
import { UserModel } from './db/model'
import { ApolloServer } from 'apollo-server-express'
import schema from './graphql'

import './db/connection'

const gqlPath = '/graphql'
const PORT = 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// basic mongoose
app.post('/create', async (req, res) => {
    console.log(req.body)
    const { name } = req.body
    const user = await UserModel.create({ name: name })
    res.send(user)
})
app.get('/users', async (req, res) => {
    const users = await UserModel.find()
    res.send(users)
})
app.get('/user/:id', async (req, res) => {
    console.log(req.params) // get request by :
    const { id } = req.params
    const user = await UserModel.findByIdAndRemove(id)
    res.send(user)
})
app.get('/user', async (req, res) => {
    console.log(req.query)  // get request by ?
    const { name } = req.query
    const user = await UserModel.findOne({ name: name })
    res.status(200).send(user)
})
app.put('/update/:id', async (req, res) => {
    console.log({ ...req.query })
    const { id } = req.params
    const user = await UserModel.findOneAndUpdate({ _id: id }, { ...req.query })
    res.send()
})
////////////////////////////

const startApolloServer = async (schema) => {
    const server = new ApolloServer({ schema })
    await server.start()
    server.applyMiddleware({ app, path: gqlPath })
    app.listen(PORT, () => {
        console.log(`Server is listening on port http://localhost:${PORT}${server.graphqlPath}`);
    })
}

startApolloServer(schema)
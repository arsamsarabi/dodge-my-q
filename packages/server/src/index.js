import express from 'express'
import chalk from 'chalk'
import cors from 'cors'
import mongoose from 'mongoose'
import graphqlHTTP from 'express-graphql'
import api from './api'
import schema from './schema/schema'

const PORT = process.env.PORT || 4200

const app = express()

mongoose.connect('mongodb://localhost:27017/dodgemyqinshaallah', { useNewUrlParser: true })
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', function() {
  console.log(chalk.bgCyanBright.black('🧙  db connected 🧙  '))
})

app.use(cors())

app.use('/api', api)

app.use('/gql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development',
}))

app.listen(PORT, () => console.log(chalk.bgGreenBright.black(`✨  Magic happens on port ${PORT} ✨  `)))

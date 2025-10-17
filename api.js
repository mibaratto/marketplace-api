import 'dotenv/config'
import express from 'express'
import db from './config/db.js'
import routes from './config/routes.js'

// app.js

db.on('connected', function () {
  console.log('connected!')
})

db.on('disconnected', function () {
  console.log('disconnected!')
})

db.on('error', function (error) {
  console.log('Connection error: ' + error)
})

const app = express()
const port = 3000

app.use(express.json()) // emitir envio de dados no corpo da requisição em formato JSON
routes(app)

// Inicializa o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`)
})

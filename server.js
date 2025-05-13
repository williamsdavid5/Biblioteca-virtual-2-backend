import fastify from 'fastify'
import cors from '@fastify/cors'
import { Database } from './database.js'

const server = fastify()

await server.register(cors, {
    origin: '*'
})

const database = new Database()

server.post('/livros', async (req, res) => {
    const { nome, autor, ano_publicacao, descricao, disponivel } = req.body

    await database.create({
        nome,
        autor,
        ano_publicacao,
        descricao,
        disponivel
    })

    return res.status(201).send()
})

server.get('/livros', async (req, res) => {
    const search = req.query.search
    const livros = await database.list(search)
    return livros
})

server.put('/livros/:id', async (req, res) => {
    const livroId = req.params.id
    const { nome, autor, ano_publicacao, descricao, disponivel } = req.body

    await database.update(livroId, {
        nome,
        autor,
        ano_publicacao,
        descricao,
        disponivel
    })

    return res.status(204).send()
})

server.delete('/livros/:id', async (req, res) => {
    const livroId = req.params.id
    await database.delete(livroId)

    return res.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3000,
    host: '0.0.0.0'
}).then(() => {
    console.log('🚀 HTTP server running')
})
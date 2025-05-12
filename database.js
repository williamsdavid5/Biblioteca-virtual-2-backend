import { sql } from './db.js'

export class Database {
    async list(search) {
        let livros

        if (search) {
            livros = await sql`select * from livros where nome ilike ${'%' + search + '%'}`
        } else {
            livros = await sql`select * from livros`
        }

        return livros
    }

    async create(livro) {
        const { nome, autor, ano_publicacao, descricao, disponivel } = livro;

        await sql`insert into livros (nome, autor, ano_publicacao, descricao, disponivel) values (${nome}, ${autor}, ${ano_publicacao}, ${descricao}, ${disponivel})`
    }

    async update(id, livro) {
        const { nome, autor, ano_publicacao, descricao, disponivel } = livro

        await sql`update livros set nome = ${nome}, autor = ${autor}, ano_publicacao = ${ano_publicacao}, descricao = ${descricao}, disponivel = ${disponivel}`
    }

    async delete(id) {
        await sql`delete from livros where id = ${id}`
    }
}
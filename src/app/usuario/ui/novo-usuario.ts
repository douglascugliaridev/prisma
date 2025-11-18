import Terminal from "../../ui/terminal.js"
import type Usuario from "../model/usuario.js"
import ProvedorCriptografia from "../infra/provedor-criptografia.js"
import RepositorioUsuario from "../infra/repositorio-usuario.js"
import { PrismaClient } from "@prisma/client"

export async function novoUsuario() {
    Terminal.limparTela()
    Terminal.titulo("Novo Usuário")

    const prismaClient = new PrismaClient()
    const novoUsuario: Partial<Usuario> = {}
    novoUsuario.nome = await Terminal.textoObrigatorio("Nome: ")
    novoUsuario.email = await Terminal.textoObrigatorio("Email: ")
    novoUsuario.senha = await new ProvedorCriptografia().encriptar(await Terminal.textoObrigatorio("Senha: ", { echo: false }))
    novoUsuario.ativo = await Terminal.SimOuNao("Ativo")

    await new RepositorioUsuario(prismaClient).salvar(novoUsuario)
}

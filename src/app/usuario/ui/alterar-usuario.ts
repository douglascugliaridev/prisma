import Terminal from "../../ui/terminal.js";
import type Usuario from "../model/usuario.js";
import { PrismaClient } from "@prisma/client";
import repositorioUsuario from "../infra/repositorio-usuario.js";

export async function alterarUsuario(usuario: Usuario) {
    Terminal.limparTela()
    Terminal.titulo("Alterar Usuário")
    const alterarUsuario: Partial<Usuario> = { ...usuario }
    alterarUsuario.nome = await Terminal.textoObrigatorio("Nome: ", { default: usuario.nome })
    alterarUsuario.email = await Terminal.textoObrigatorio("Email: ", { default: usuario.email })

    const prismaClient = new PrismaClient()
    const repositorio = new repositorioUsuario(prismaClient)
    await repositorio.alterar(alterarUsuario)

    console.log("Usuário alterado com sucesso!")
}

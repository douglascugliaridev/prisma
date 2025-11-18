import type Usuario from "../model/usuario.js";
import Terminal from "../../ui/terminal.js";
import repositorioUsuario from "../infra/repositorio-usuario.js";
import { PrismaClient } from "@prisma/client";

export async function excluirUsuario(usuario: Usuario) {
    Terminal.limparTela()
    Terminal.titulo("Excluir Usuário")
    const prismaClient = new PrismaClient()
    const repo = new repositorioUsuario(prismaClient)
    Terminal.tabela([usuario])

    const confirmacao = await Terminal.SimOuNao("Confirma a exclusão?")

    if (!confirmacao) {
        return
    }


    await repo.excluir(usuario.id)

    console.log("Usuário excluído com sucesso!")
}
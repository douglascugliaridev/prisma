import { PrismaClient } from "@prisma/client"
import RepositorioUsuario from "../infra/repositorio-usuario.js"
import Terminal from "../../ui/terminal.js"

export async function listarUsuario() {
    const prismaClient = new PrismaClient()
    const repositorioUsuario = new RepositorioUsuario(prismaClient)
    const usuarios = await repositorioUsuario.listar()

    Terminal.tabela(usuarios,
        [
            "ID",
            "Nome",
            "Email",
            "Ativo"
        ]
    )
}

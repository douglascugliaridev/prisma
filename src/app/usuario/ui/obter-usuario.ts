import Terminal from "../../ui/terminal.js";
import repositorioUsuario from "../infra/repositorio-usuario.js";
import { PrismaClient } from "@prisma/client";
import { excluirUsuario } from "./excluir-usuario.js";
import { alterarUsuario } from "./alterar-usuario.js";

export async function obterUsuario() {
    const prismaClient = new PrismaClient()
    const repositorio = new repositorioUsuario(prismaClient)
    const filtro = await Terminal.opcoes("Filtre por:", ["ID", "Email"])
    let usuario: any;

    Terminal.limparTela()
    const valorConsultar = filtro === 0 ? await Terminal.textoObrigatorio("ID: ") : await Terminal.textoObrigatorio("Email: ")

    usuario = filtro === 0 ? await repositorio.obterUsuario(Number(valorConsultar)) : await repositorio.obterUsuarioPorEmail(valorConsultar)

    if (!usuario) {
        return
    }

    Terminal.tabela([usuario])

    const opcao = await Terminal.menu("O que deseja fazer?", ["Editar", "Excluir", "Voltar"])

    switch (opcao) {
        case 0:
            await alterarUsuario(usuario)
            break
        case 1:
            await excluirUsuario(usuario)
            break
        case 2:
            return
    }
}

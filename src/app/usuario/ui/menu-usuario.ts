import Terminal from "../../ui/terminal.js"
import { novoUsuario } from "./novo-usuario.js"
import { listarUsuario } from "./listar-usuario.js"
import { obterUsuario } from "./obter-usuario.js"

export async function menuUsuario() {
    const itens = [
        'Novo Usuário',
        'Listar Usuários',
        'Usuário por ID ou Email',
        'Voltar'
    ]

    Terminal.limparTela()
    const menu = await Terminal.menu("Menu de Usuário", itens)

    Terminal.limparTela()

    switch (menu) {
        case 0:
            await novoUsuario()
            break;
        case 1:
            await listarUsuario()
            break;
        case 2:
            await obterUsuario()
            break;
        case 3:
            return
    }

    await Terminal.esperarEnter()
    await menuUsuario()
}
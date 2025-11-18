import Terminal from "./ui/terminal.js"
import { menuUsuario } from "./usuario/ui/menu-usuario.js"

export async function menuPrincipal() {

    const itens = [
        'Cadastro de Usuários',
        'Sair'
    ]

    Terminal.limparTela()
    const menu = await Terminal.menu("Menu Principal", itens)

    Terminal.limparTela()

    switch (menu) {
        case 0:
            await menuUsuario()
            break;
        case 1:
            process.exit(0)
    }

    await menuPrincipal()
}
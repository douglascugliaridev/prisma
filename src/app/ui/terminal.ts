import term from 'terminal-kit'

export default class Terminal {

    static limparTela() {
        term.terminal.clear()
    }

    static async esperarEnter(): Promise<void> {
        return new Promise((resolve) => {
            term.terminal("\nPressione Enter para continuar...")
            term.terminal.on("key", (key: any) => {
                if (key === "Enter") {
                    resolve()
                }
            })
        })
    }

    static titulo(titulo: string) {
        term.terminal.white.bold(titulo)
        term.terminal("\n")
        term.terminal.white(Array(titulo.length).fill('-').join(''))
        term.terminal("\n")
    }

    static menu(titulo: string, itens: string[]): Promise<number> {
        this.titulo(titulo)
        return new Promise((resolve, reject) => {

            term.terminal.singleColumnMenu(itens, (err, response) => {
                if (err) {
                    reject(err)
                    return
                }

                resolve(response.selectedIndex)
            })
        })
    }

    static async textoObrigatorio(label: string, opcoes: term.Terminal.InputFieldOptions = {}): Promise<string> {
        term.terminal.white.bold(`${label}`)

        return new Promise((resolve) => {
            term.terminal.inputField(opcoes, (err, response) => {
                const resp = response?.trim() ?? ""
                if (resp) {
                    resolve(resp)
                    Terminal.novaLinha()
                } else {
                    Terminal.textoObrigatorio(label).then(resolve)
                }
            })
        })
    }

    static novaLinha() {
        term.terminal("\n")
    }

    static async SimOuNao(label: string): Promise<boolean> {
        term.terminal.white.bold(`${label} (S/N): `)

        return new Promise((resolve) => {
            term.terminal.singleRowMenu(['Sim', 'Não'], (err, response) => {
                resolve(response.selectedIndex === 0)
            })
        })
    }

    static async tabela(dados: any[], colunas: string[] = []) {
        const linhas = dados.map(linha => Object.values(linha) as string[])
        term.terminal.table(colunas.length ? [colunas, ...linhas] : linhas)
    }

    static async opcoes(label: string, itens: string[]): Promise<number> {
        term.terminal.white.bold(`${label}`)

        return new Promise((resolve) => {
            term.terminal.singleColumnMenu(itens, (err, response) => {
                resolve(response.selectedIndex)
            })
        })
    }
}
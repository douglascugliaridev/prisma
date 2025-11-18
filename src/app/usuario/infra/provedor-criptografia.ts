import bcrypt from "bcrypt"

export default class ProvedorCriptografia {

    async encriptar(senha: string) {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hashSync(senha, salt)
    }

    async verificar(senha: string, hash: string) {
        return await bcrypt.compareSync(senha, hash)
    }
}
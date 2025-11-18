import type { PrismaClient } from "@prisma/client";
import type Usuario from "../model/usuario.js";

export default class RepositorioUsuario {

    private prismaClient: PrismaClient

    constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient
    }

    async salvar(usuario: Partial<Usuario>) {
        return this.prismaClient.usuario.create({
            data: usuario as any
        })
    }

    async listar(): Promise<Usuario[]> {
        return this.prismaClient.usuario.findMany({
            omit: { senha: true }
        })
    }

    async obterUsuario(id: number): Promise<Usuario | null> {
        return this.prismaClient.usuario.findUnique({
            where: { id },
            omit: { senha: true }
        })
    }

    async obterUsuarioPorEmail(email: string): Promise<Usuario | null> {
        return this.prismaClient.usuario.findUnique({
            where: { email },
            omit: { senha: true }
        })
    }

    async excluir(id: number) {
        await this.prismaClient.usuario.delete({
            where: { id: id }
        })
    }

    async alterar(usuario: Partial<Usuario>) {
        await this.prismaClient.usuario.update({
            where: { id: usuario.id ?? -1 },
            data: usuario
        })
    }

}
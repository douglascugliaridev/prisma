import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type Usuario = Prisma.UsuarioGetPayload<{}>;

async function exercicio() {
    const usuario: Partial<Usuario> = {
        nome: "Gustavo Pereira",
        email: "gustavo.pereira1@usuario.com",
        senha: "123456",
        ativo: true,
        id: 10
    }

    const usuarioSalvo = await prisma.usuario.upsert({
        where: {
            id: usuario.id ?? -1
        },
        create: usuario as any,
        update: usuario,
    })

    console.log(usuarioSalvo);
}

exercicio();
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function exercicio() {
    const usuario = await prisma.usuario.update({
        where: {
            id: 2
        },
        data: {
            ativo: false
        }
    })
    console.log(usuario);
}

exercicio();

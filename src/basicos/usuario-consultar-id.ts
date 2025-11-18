import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function exercicio() {
    const usuario = await prisma.usuario.findUnique({
        where: {
            id: 1
        }
    })
    console.log(usuario);
}

exercicio();


import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function exercicio() {
    const usuarios = await prisma.usuario.findMany({
        where: {
            ativo: true
        }
    })
    console.log(usuarios);
}

exercicio();

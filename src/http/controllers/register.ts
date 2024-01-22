import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { RegisterUseCase } from '@/use-cases/register'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8).max(100),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerCase = new RegisterUseCase(prismaUsersRepository)

        await registerCase.execute({
            name,
            email,
            password,
        })
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return await reply.status(409).send({ error: error.message })
        }

        // Dessa forma o erro é lançado para o handler de erros
        throw error
    }

    return await reply.status(201).send()
}

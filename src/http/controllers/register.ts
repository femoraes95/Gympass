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

        await registerCase.execute({ name, email, password })
    } catch (error) {
        return await reply.status(400).send()
    }

    return await reply.status(201).send()
}

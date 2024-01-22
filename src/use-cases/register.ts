import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUserCaseProps {
    name: string
    email: string
    password: string
}
// Conceito do Solid para separar as responsabilidades
export class RegisterUseCase {
    constructor(private readonly usersRepository: any) {}

    async execute({ name, email, password }: RegisterUserCaseProps) {
        const password_hash = await hash(password, 6)
        const UserWithSameEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (UserWithSameEmail) {
            throw new Error('User already exists')
        }

        await this.usersRepository.create({
            name,
            email,
            password_hash,
        })
    }
}

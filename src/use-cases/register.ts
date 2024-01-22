import { type UsersRepository } from '@/repositories/users-repository'
import { type User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUserCaseProps {
    name: string
    email: string
    password: string
}

interface RegisterUseCaseResponse {
    user: User
}

// Conceito do Solid para separar as responsabilidades
export class RegisterUseCase {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute({
        name,
        email,
        password,
    }: RegisterUserCaseProps): Promise<RegisterUseCaseResponse> {
        const password_hash = await hash(password, 6)

        // Verifica se o usuário já existe
        const UserWithSameEmail = await this.usersRepository.findByEmail(email)

        if (UserWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
        })

        return {
            user,
        }
    }
}

import { type UsersRepository } from '@/repositories/users-repository'
import { type User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AutenticateUseCaseRequest {
    email: string
    password: string
}

// Resposta que o use case retorna
interface AutenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private readonly userRepository: UsersRepository) {}

    async execute({
        email,
        password,
    }: AutenticateUseCaseRequest): Promise<AutenticateUseCaseResponse> {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatch = await compare(password, user.password_hash)

        if (!doesPasswordMatch) {
            throw new InvalidCredentialsError()
        }

        return { user }
    }
}

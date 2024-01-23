import { type UsersRepository } from '@/repositories/users-repository'
import { type User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resources-not-found'

interface GetProfileUseCaseRequest {
    userId: string
}

// Resposta que o use case retorna
interface GetProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(private readonly userRepository: UsersRepository) {}

    async execute({
        userId,
    }: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
        const user = await this.userRepository.findById(userId)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        return { user }
    }
}

import { type GymsRepository } from '@/repositories/gyms-repository'
import { type Gym } from '@prisma/client'

interface SearchGymUseCaseRequest {
    query: string
    page: number
}

interface CreateGymUseCaseResponse {
    gyms: Gym[]
}

export class SearchGymsUseCase {
    constructor(private readonly gymsRepository: GymsRepository) {}

    async execute({
        query,
        page,
    }: SearchGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
        const gyms = await this.gymsRepository.searchMany(query, page)

        return {
            gyms,
        }
    }
}

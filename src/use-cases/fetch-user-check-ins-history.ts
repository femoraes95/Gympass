import { type CheckInsRepository } from '@/repositories/check-ins-repository'
import { type CheckIn } from '@prisma/client'

interface FetchUserCheckInsHistoryUseCaseRequest {
    userId: string
    page: number
}

interface CheckInUseCaseResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
    constructor(private readonly checkInsRepository: CheckInsRepository) {}

    async execute({
        userId,
        page,
    }: FetchUserCheckInsHistoryUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const checkIns = await this.checkInsRepository.findManyByUserId(
            userId,
            page,
        )

        return {
            checkIns,
        }
    }
}

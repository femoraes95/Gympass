import { type CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsUseCaseRequest {
    userId: string
}

interface CheckInUseCaseResponse {
    checkInsCount: number
}

export class GetUserMetricsUseCase {
    constructor(private readonly checkInsRepository: CheckInsRepository) {}

    async execute({
        userId,
    }: GetUserMetricsUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const checkInsCount =
            await this.checkInsRepository.countByUserId(userId)

        return {
            checkInsCount,
        }
    }
}

import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUsersMetricsUseCase() {
    const repository = new PrismaCheckInsRepository()
    const useCase = new GetUserMetricsUseCase(repository)

    return useCase
}

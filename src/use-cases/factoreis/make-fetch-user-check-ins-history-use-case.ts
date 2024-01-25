import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckinHistoryUseCase() {
    const repository = new PrismaCheckInsRepository()
    const useCase = new FetchUserCheckInsHistoryUseCase(repository)

    return useCase
}

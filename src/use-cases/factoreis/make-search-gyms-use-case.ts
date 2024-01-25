import { PrismaGymRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsUseCase } from '../search-gyms'

export function makeSearchGymsUseCase() {
    const repository = new PrismaGymRepository()
    const useCase = new SearchGymsUseCase(repository)

    return useCase
}

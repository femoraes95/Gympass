import { PrismaGymRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
    const repository = new PrismaGymRepository()
    const useCase = new CreateGymUseCase(repository)

    return useCase
}

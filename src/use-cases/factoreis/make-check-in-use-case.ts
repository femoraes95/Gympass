import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'

export function makeCheckInUseCase() {
    const repository = new PrismaCheckInsRepository()
    const gymsRepository = new PrismaGymRepository()
    const useCase = new CheckInUseCase(repository, gymsRepository)

    return useCase
}

import { prisma } from '@/lib/prisma'
import { type Prisma } from '@prisma/client'
import { type GymsRepository } from '../gyms-repository'

export class PrismaGymRepository implements GymsRepository {
    async findById(id: string) {
        const gym = await prisma.gym.findUnique({
            where: {
                id,
            },
        })

        return gym
    }

    async searchMany(query: string, page: number) {
        const gyms = await prisma.gym.findMany({
            where: {
                title: {
                    contains: query,
                },
            },
            take: 20,
            skip: (page - 1) * 20,
        })

        return gyms
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = await prisma.gym.create({
            data,
        })

        return gym
    }
}

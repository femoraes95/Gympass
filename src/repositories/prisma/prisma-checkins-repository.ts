import { prisma } from '@/lib/prisma'
import { type CheckInsRepository } from '../check-ins-repository'

export class PrismaCheckInsRepository implements CheckInsRepository {
    async findById(id: string) {
        const user = await prisma.checkIn.findUnique({
            where: {
                id,
            },
        })
        return user
    }

    async create(data: any) {
        const checkIn = await prisma.checkIn.create({
            data,
        })
        return checkIn
    }

    async save(checkIn: any) {
        const updatedCheckIn = await prisma.checkIn.update({
            where: {
                id: checkIn.id,
            },
            data: checkIn,
        })
        return updatedCheckIn
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        throw new Error('Method not implemented.')
    }

    async countByUserId(userId: string) {
        throw new Error('Method not implemented.')
    }

    async findManyByUserId(userId: string, page: number) {
        throw new Error('Method not implemented.')
    }
}

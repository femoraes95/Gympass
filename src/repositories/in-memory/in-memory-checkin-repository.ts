import { type CheckIn, type Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { type CheckInsRepository } from '../check-ins-repository'

export class InMemoryCheckInRepository implements CheckInsRepository {
    public items: CheckIn[] = []

    async findByUserIdOnDate(userId: string, date: Date) {
        const checkInSameDate = this.items.find(
            (checkIn) => checkIn.user_id === userId,
        )

        if (!checkInSameDate) return null

        return checkInSameDate
    }

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at
                ? new Date(data.validated_at)
                : null,
            created_at: new Date(),
        }

        this.items.push(checkIn)

        return checkIn
    }
}
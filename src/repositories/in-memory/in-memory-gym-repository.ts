import { Prisma, type Gym } from '@prisma/client'
import { randomUUID } from 'crypto'
import { type GymsRepository } from '../gyms-repository'

export class InMemoryGymRepository implements GymsRepository {
    public items: Gym[] = []

    async searchMany(query: string, page: number) {
        const gyms = this.items
            .filter((gym) => gym.title.includes(query))
            .slice((page - 1) * 20, page * 20)

        return gyms
    }

    async findById(id: string) {
        const gym = this.items.find((gym) => gym.id === id)

        if (!gym) {
            return null
        }

        return gym
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            created_at: new Date(),
        }

        this.items.push(gym)

        return gym
    }
}

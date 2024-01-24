import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Check-in Use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInRepository()
        sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
    })

    it('should be able to fetch check-ins ', async () => {
        await checkInsRepository.create({
            user_id: 'any_user_id',
            gym_id: `gym_01`,
        })

        await checkInsRepository.create({
            user_id: 'any_user_id',
            gym_id: `gym_02`,
        })

        const { checkIns } = await sut.execute({
            userId: 'any_user_id',
            page: 1,
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym_01' }),
            expect.objectContaining({ gym_id: 'gym_02' }),
        ])
    })

    it('should be able to fetch paginated check-ins history', async () => {
        for (let i = 0; i <= 22; i++) {
            await checkInsRepository.create({
                user_id: 'any_user_id',
                gym_id: `gym_${i}`,
            })
        }

        const { checkIns } = await sut.execute({
            userId: 'any_user_id',
            page: 2,
        })

        expect(checkIns).toHaveLength(3)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym_20' }),
            expect.objectContaining({ gym_id: 'gym_21' }),
            expect.objectContaining({ gym_id: 'gym_22' }),
        ])
    })
})

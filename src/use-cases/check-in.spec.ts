import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInRepository()
        sut = new CheckInUseCase(checkInsRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in ', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'any_gym_id',
            userId: 'any_user_id',
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await sut.execute({
            gymId: 'any_gym_id',
            userId: 'any_user_id',
        })

        await expect(
            async () =>
                await sut.execute({
                    gymId: 'any_gym_id',
                    userId: 'any_user_id',
                }),
        ).rejects.toBeInstanceOf(Error)
    })
})

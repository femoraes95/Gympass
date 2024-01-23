import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { MaxDistanceError } from './errors/max-distance-errors'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins'

let checkInsRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInRepository()
        gymsRepository = new InMemoryGymRepository()
        sut = new CheckInUseCase(checkInsRepository, gymsRepository)

        await gymsRepository.create({
            id: 'any_gym_id',
            title: 'any_title',
            phone: 'any_phone',
            description: 'any_description',
            latitude: -23.6106794,
            longitude: -46.6222736,
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in ', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'any_gym_id',
            userId: 'any_user_id',
            userLatitude: -23.6106794,
            userLongitude: -46.6222736,
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
        ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    })

    // Check in em dias diferentes
    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        await sut.execute({
            gymId: 'any_gym_id',
            userId: 'any_user_id',
            userLatitude: -23.6106794,
            userLongitude: -46.6222736,
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const { checkIn } = await sut.execute({
            gymId: 'any_gym_id',
            userId: 'any_user_id',
            userLatitude: -23.6106794,
            userLongitude: -46.6222736,
        })
        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in on distance', async () => {
        gymsRepository.items.push({
            id: 'gym_02',
            title: 'any_title',
            phone: 'any_phone',
            description: 'any_description',
            latitude: new Decimal(-23.6035501),
            longitude: new Decimal(-46.5952603),
        })

        await expect(
            async () =>
                await sut.execute({
                    gymId: 'gym_02',
                    userId: 'any_user_id',
                    userLatitude: -23.6106794,
                    userLongitude: -46.6222736,
                }),
        ).rejects.toBeInstanceOf(MaxDistanceError)
    })
})

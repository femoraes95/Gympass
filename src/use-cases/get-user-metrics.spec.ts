import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkin-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { type FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Get User Metrics Use Case', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInRepository()
        sut = new GetUserMetricsUseCase(checkInsRepository)
    })

    it('should be able to get check-ins count from metrics', async () => {
        await checkInsRepository.create({
            user_id: 'any_user_id',
            gym_id: `gym_01`,
        })

        await checkInsRepository.create({
            user_id: 'any_user_id',
            gym_id: `gym_02`,
        })

        const { checkInsCount } = await sut.execute({
            userId: 'any_user_id',
        })

        expect(checkInsCount).toEqual(2)
    })
})

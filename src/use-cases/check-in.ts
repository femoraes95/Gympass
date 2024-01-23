import { type CheckInsRepository } from '@/repositories/check-ins-repository'
import { type GymsRepository } from '@/repositories/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { type CheckIn } from '@prisma/client'
import { MaxDistanceError } from './errors/max-distance-errors'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins'
import { ResourceNotFoundError } from './errors/resources-not-found'

interface CheckInCaseRequest {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

// Conceito do Solid para separar as responsabilidades
export class CheckInUseCase {
    constructor(
        private readonly checkInsRepository: CheckInsRepository,
        private readonly gymRepository: GymsRepository,
    ) {}

    async execute({
        gymId,
        userId,
        userLatitude,
        userLongitude,
    }: CheckInCaseRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        // Calcular a distância entre o usuário e a academia
        const distance = getDistanceBetweenCoordinates(
            {
                latitude: gym.latitude.toNumber(),
                longitude: gym.longitude.toNumber(),
            },
            {
                latitude: userLatitude,
                longitude: userLongitude,
            },
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if (distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new MaxDistanceError()
        }

        const checkInSameDate =
            await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

        // Se o checkInSameDate for diferente de null, ele vai retornar um erro
        if (checkInSameDate) throw new MaxNumberOfCheckInsError()
        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId,
        })

        return {
            checkIn,
        }
    }
}

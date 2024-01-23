import { type CheckInsRepository } from '@/repositories/check-ins-repository'
import { type CheckIn } from '@prisma/client'

interface RegisterUserCaseProps {
    userId: string
    gymId: string
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

// Conceito do Solid para separar as responsabilidades
export class CheckInUseCase {
    constructor(private readonly checkInsRepository: CheckInsRepository) {}

    async execute({
        gymId,
        userId,
    }: RegisterUserCaseProps): Promise<CheckInUseCaseResponse> {
        const checkInSameDate =
            await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

        // Se o checkInSameDate for diferente de null, ele vai retornar um erro
        if (checkInSameDate) throw new Error()
        const checkIn = await this.checkInsRepository.create({
            user_id: gymId,
            gym_id: userId,
        })

        return {
            checkIn,
        }
    }
}

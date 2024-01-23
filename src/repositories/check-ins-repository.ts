import { type CheckIn, type Prisma } from '@prisma/client'

// Esse método que ira criar o checkin, quando existe um relacionamento com outra tabela deve se usar o UncheckedCreateInput

export interface CheckInsRepository {
    create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>
    findByUserIdOnDate: (userId: string, date: Date) => Promise<CheckIn | null>
}

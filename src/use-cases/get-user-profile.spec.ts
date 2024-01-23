import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resources-not-found'
import { GetUserProfileUseCase } from './get-user-profile'

// Testes unitários não devem depender de nada externo, como banco de dados, rede, etc.
let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })

    it('Deve retornar as informacoes do usuario', async () => {
        const email = 'teste@teste.com'
        const senha = '123456'

        // Criar usuario diretamente daqui
        const createdUser = await usersRepository.create({
            email,
            password_hash: await hash(senha, 6),
            name: 'Felipe ',
        })

        const { user } = await sut.execute({
            userId: createdUser.id,
        })

        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual('Felipe ')
    })

    it('deve retornar erro quando o id não existir.', async () => {
        await expect(async () => {
            await sut.execute({
                userId: '123123123123',
            })
        }).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})

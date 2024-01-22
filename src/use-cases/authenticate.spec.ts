import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

// Testes unitários não devem depender de nada externo, como banco de dados, rede, etc.
let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(usersRepository)
    })

    it('Usuário pode se autenticar ', async () => {
        const email = 'teste@teste.com'
        const senha = '123456'

        // Criar usuario diretamente daqui
        await usersRepository.create({
            email,
            password_hash: await hash(senha, 6),
            name: 'Felipe ',
        })

        const { user } = await sut.execute({
            email,
            password: senha,
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('email invalido do usuario ', async () => {
        const email = 'teste@teste.com'
        const senha = '123456'

        await expect(async () => {
            await sut.execute({
                email,
                password: senha,
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('senha invalido do usuario ', async () => {
        const email = 'teste@teste.com'
        const senha = '123456'

        // Criar usuario diretamente daqui
        await usersRepository.create({
            email,
            password_hash: await hash(senha, 6),
            name: 'Felipe ',
        })

        await expect(async () => {
            await sut.execute({
                email,
                password: '11123213123123',
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})

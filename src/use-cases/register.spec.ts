import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register'

// Testes unitários não devem depender de nada externo, como banco de dados, rede, etc.

describe('Register Use Case', () => {
    it('Usuário criado com sucesso ', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'test21321321321321e@teste.com',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('a senha do usuario deve ser hash assim que ele se cadastrar', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'test21321321321321e@teste.com',
            password: '123456',
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('Não deve ser possível cadastrar usuário duplicados com o mesmo email', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const email = 'felipe@hospitalpaulista.com.br'

        await registerUseCase.execute({
            name: 'John Doe',
            email,
            password: '123456',
        })

        await expect(
            async () =>
                await registerUseCase.execute({
                    name: 'John Doe',
                    email,
                    password: '123456',
                }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})

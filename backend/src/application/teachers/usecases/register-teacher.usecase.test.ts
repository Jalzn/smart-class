import { AlreadyExistsError } from '@/domain/errors'
import { ITeacherRepository, IUserRepository } from '@/domain/repositories'
import { IHashService, IJwtService } from '@/domain/services'
import { HashService } from '@/infra/services/hash.service'
import { JwtService } from '@/infra/services/jwt.service'
import { RegisterTeacherUsecase } from './register-teacher.usecase'

describe('RegisterTeacherUsecase', () => {
    let teacherRepository: jest.Mocked<ITeacherRepository>
    let userRepository: jest.Mocked<IUserRepository>

    let registerTeacherUsecase: RegisterTeacherUsecase

    let jwtService: IJwtService
    let hashService: IHashService

    beforeEach(() => {
        teacherRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            deleteById: jest.fn(),
        } as jest.Mocked<ITeacherRepository>

        userRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            findByEmail: jest.fn(),
            create: jest.fn(),
            deleteById: jest.fn(),
        } as jest.Mocked<IUserRepository>

        jwtService = new JwtService()
        hashService = new HashService()

        registerTeacherUsecase = new RegisterTeacherUsecase(
            teacherRepository,
            userRepository,
            jwtService,
            hashService
        )
    })

    test('should success to register teacher', async () => {
        const response = await registerTeacherUsecase.execute({
            email: 'foobar@email.com',
            password: 'Foobar123!@#',
            name: 'foobar',
        })

        expect(response.token).toBeDefined()
    })

    test('shoul fail to existing user', async () => {
        userRepository.create.mockRejectedValue(
            new AlreadyExistsError('User already exists')
        )

        try {
            await registerTeacherUsecase.execute({
                email: 'foobar@email.com',
                password: 'Foobar123!@#l',
                name: 'foobar',
            })
        } catch (e) {
            expect(e).toBeInstanceOf(AlreadyExistsError)
        }
    })
})

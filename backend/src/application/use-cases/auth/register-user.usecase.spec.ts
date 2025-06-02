import { RegisterUserUseCase } from '@/application/use-cases/auth/register-user.usecase';
import { UserRepository } from '@/domain/ports/user.repository.port';
import { JwtService } from '@/infrastructure/providers/jwt.service';
import { User } from '@/domain/entities/user.entity';
import * as bcrypt from 'bcrypt';

describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCase;
  let userRepository: UserRepository;
  let jwtService: JwtService;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    } as any;

    jwtService = {
      generateToken: jest.fn(),
      sign: jest.fn(),
    } as any;

    useCase = new RegisterUserUseCase(userRepository, jwtService);
  });

it('should register a new user and return a token', async () => {
  const user = new User('1', 'test@test.com', 'hashed', 'test');

  jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
  jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed' as never);
  jest.spyOn(userRepository, 'create').mockResolvedValue(user);
  jest.spyOn(jwtService, 'sign').mockReturnValue('fake-token');

  const result = await useCase.execute({ email: 'test@test.com', password: '123456', username: 'test' });

  expect(result).toEqual({ user, token: 'fake-token' });
});


  it('should throw an error if user already exists', async () => {
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue({ id: '1' } as any);

    await expect(
      useCase.execute({ email: 'test@test.com', password: '123456', username: 'test' }),

    ).rejects.toThrow('User already exists');
  });
});

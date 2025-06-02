import { LoginUserUseCase } from '@/application/use-cases/auth/login-user.usecase';
import { User } from '@/domain/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { userRepositoryMock as userRepository } from '@/domain/ports/user.repository.mock';
import { JwtService } from '@/infrastructure/providers/jwt.service';
describe('LoginUserUseCase', () => {

  let useCase: LoginUserUseCase;
  let jwtService: JwtService;

  beforeEach(() => {
    
    jwtService = {
      sign: jest.fn().mockReturnValue('mocked-jwt-token'),
      verify: jest.fn().mockReturnValue({ sub: 'user-id' }),
    } as any;

    useCase = new LoginUserUseCase(userRepository, jwtService);
  });

  it('should login a user and return a token', async () => {
    const password = await bcrypt.hash('123456', 10);
    const user = new User( '1', 'test@test.com', password );
  
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(user);
    jest.spyOn(jwtService, 'sign' as never).mockReturnValue('fake-token' as never);
  
    const result = await useCase.execute({ email: 'test@test.com', password: '123456' });
  
    expect(result).toEqual({ token: 'fake-token', user });
  });

  it('should throw if email is not found', async () => {
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

    await expect(
      useCase.execute({ email: 'notfound@test.com', password: '123456' }),
    ).rejects.toThrow('Invalid credentials');
  });

  it('should throw if password is incorrect', async () => {
    const user = new User( '1', 'test@test.com', await bcrypt.hash('otherpass', 10) );
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(user);

    await expect(
      useCase.execute({ email: 'test@test.com', password: 'wrongpass' }),
    ).rejects.toThrow('Invalid credentials');
  });
});

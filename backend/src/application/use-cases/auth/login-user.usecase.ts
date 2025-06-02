import { UserRepository } from '@/domain/ports/user.repository.port';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@/infrastructure/providers/jwt.service';
import { User } from '@/domain/entities/user.entity';

interface LoginUserDTO {
  email: string;
  password: string;
}

export class LoginUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(data: LoginUserDTO): Promise<{ token: string; user: User }> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = this.jwtService.sign({ userId: user.id });

    return { token, user };
  }
}

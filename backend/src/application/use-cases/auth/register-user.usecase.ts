import { UserRepository } from '@/domain/ports/user.repository.port';
import { User } from '@/domain/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@/infrastructure/providers/jwt.service';

interface RegisterUserDTO {
  username: string;
  email: string;
  password: string;
}

export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(data: RegisterUserDTO): Promise<{user:User, token:string}> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user: User = {
      id: '',
      username: data.username,
      email: data.email,
      password: hashedPassword,
    };

    const createdUser = await this.userRepository.create(user);

    const token = this.jwtService.sign(
      { userId: createdUser.id, email: createdUser.email }
    );

    return { user: createdUser, token };
  }
}

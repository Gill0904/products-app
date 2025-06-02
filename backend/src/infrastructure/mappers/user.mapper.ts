import { User } from '@/domain/entities/user.entity';
import { UserDocument } from '@/infrastructure/database/schemas/user.schema';

export class UserMapper {
  static toDomain(doc: UserDocument): User {
    return {
      id: doc._id ? doc._id.toString() : '',
      username: doc.username,
      email: doc.email,
      password: doc.password,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}

import { UserRepository } from '@/domain/ports/user.repository.port';
import { User } from '@/domain/entities/user.entity';
import { UserDocument, UserModel } from '@/infrastructure/database/schemas/user.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserMapper } from '@/infrastructure/mappers/user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectModel('user') private userModel: Model<UserDocument>) {}

  async findById(id: string): Promise<User | null> {
    const doc = await this.userModel.findById(id).exec();
    if (!doc) return null;
    return UserMapper.toDomain(doc);
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this.userModel.findOne({ email }).exec();
    if (!doc) return null;
    return UserMapper.toDomain(doc);
  }

  async create(user: User): Promise<User> {
    const created = new this.userModel(user);
    const saved = await created.save();
    return UserMapper.toDomain(saved);
  }
}

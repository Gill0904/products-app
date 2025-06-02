import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UserModel {
  @Prop({ required: true, unique: true })
  username: string;
  
  @Prop({ required: true, unique: true })
  email: string;
  
  @Prop({ required: true })
  password: string;
  
  @Prop({})
  createdAt: Date;
  
  @Prop({})
  updatedAt: Date;
}

export type UserDocument = UserModel & Document;
export const UserSchema = SchemaFactory.createForClass(UserModel);

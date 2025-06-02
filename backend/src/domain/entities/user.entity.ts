export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public password: string,
    public username?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}

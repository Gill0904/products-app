export enum ProductStatus {
  AVAILABLE = 'available',
  OUT_OF_STOCK = 'out_of_stock',
  DISCONTINUED = 'discontinued',
}

export class Product {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string,
    public price: number,
    public status: ProductStatus,
    public userId: string,
    public updatedAt?: Date,
    public createdAt?: Date,
  ) {}
}

import { CreateProductUseCase } from '@/application/use-cases/product/create-product.usecase';
import { productRepositoryMock as repository} from '@/domain/ports/product.repository.mock';
import { Product, ProductStatus } from '@/domain/entities/product.entity';

describe('CreateProductUseCase', () => {
  const useCase = new CreateProductUseCase(repository);

  it('should create a product', async () => {
    const now = new Date();
    const product = new Product(
      '1',
      'Test Product',
      'Description',
      99.99,
      ProductStatus.AVAILABLE,
      'user-id',
      now,
      now
    );

    jest.spyOn(repository, 'create').mockResolvedValue(product);

    const result = await useCase.execute({
      name: 'Test Product',
      description: 'Description',
      price: 99.99,
      userId: 'user-id',
      status: ProductStatus.AVAILABLE,
    });

    expect(result).toEqual(product);
    expect(repository.create).toHaveBeenCalled();
  });
});

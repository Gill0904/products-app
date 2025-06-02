import { UpdateProductUseCase } from '@/application/use-cases/product/update-product.usecase';
import { productRepositoryMock as repository} from '@/domain/ports/product.repository.mock';
import { Product, ProductStatus } from '@/domain/entities/product.entity';

describe('UpdateProductUseCase', () => {
  const useCase = new UpdateProductUseCase(repository);

  it('should update a product', async () => {
    const now = new Date();
    const product = new Product('1', 'Old', 'Desc', 1, ProductStatus.AVAILABLE, 'uid', now, now);
    const updated = new Product('1', 'New', 'Desc', 1, ProductStatus.AVAILABLE, 'uid', now, now);

    jest.spyOn(repository, 'findById').mockResolvedValue(product);
    jest.spyOn(repository, 'update').mockResolvedValue(updated);

    const result = await useCase.execute('1', {name: 'New'} );

    expect(result.name).toBe('New');
  });

  it('should throw if not found', async () => {
    jest.spyOn(repository, 'findById').mockResolvedValue(null);

    await expect(useCase.execute('nope', {description:'nope'})).rejects.toThrow('Product not found');
  });
});

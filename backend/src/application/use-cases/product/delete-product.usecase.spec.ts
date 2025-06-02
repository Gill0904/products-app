import { DeleteProductUseCase } from '@/application/use-cases/product/delete-product.usecase';
import { productRepositoryMock as repository} from '@/domain/ports/product.repository.mock';
import { Product, ProductStatus } from '@/domain/entities/product.entity';

describe('DeleteProductUseCase', () => {
  const useCase = new DeleteProductUseCase(repository);

  it('should delete a product', async () => {
    const now = new Date();
    const product = new Product('1', 'P', 'D', 1, ProductStatus.AVAILABLE, 'uid', now, now);

    jest.spyOn(repository, 'findById').mockResolvedValue(product);
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    await expect(useCase.execute( '1' )).resolves.toBeUndefined();
  });

  it('should throw if product not found', async () => {
    jest.spyOn(repository, 'findById').mockResolvedValue(null);

    await expect(useCase.execute( 'missing' )).rejects.toThrow('Product not found');
  });
});

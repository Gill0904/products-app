import { GetAllProductsUseCase } from '@/application/use-cases/product/get-products.usecase';
import { Product, ProductStatus } from '@/domain/entities/product.entity';
import { productRepositoryMock as repository} from '@/domain/ports/product.repository.mock';

describe('GetAllProductsUseCase', () => {
  const useCase = new GetAllProductsUseCase(repository);

  it('should return all products for a user', async () => {
    const now = new Date();
    const products = [
      new Product('1', 'A', 'Desc A', 10, ProductStatus.AVAILABLE, 'uid', now, now),
      new Product('2', 'B', 'Desc B', 20, ProductStatus.OUT_OF_STOCK, 'uid', now, now),
    ];

    jest.spyOn(repository, 'findAllByUser' as never).mockResolvedValue(products as never);

    const result = await useCase.execute( 'uid' );

    expect(result).toEqual(products);
  });
});

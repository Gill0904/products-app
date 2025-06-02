'use client';

import { useEffect, useState } from 'react';
import { Button } from '@heroui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/table';
import { getProducts, deleteProduct } from '../../services/product.service';
import { Product } from '../../models/product';
import { toast } from 'react-toastify';
import { ProductModal } from './productModal';
import { Page } from '../../components/ui/Page';
import { useProductModal } from '../../store/useProductModal';
import { getStatusInfo } from '../../utils/statusTranslate';

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { openModal } = useProductModal();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      toast.error('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      await deleteProduct(id);
      toast.success('Producto eliminado');
      fetchProducts();
    } catch {
      toast.error('Error al eliminar producto');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Page showHeader={true} className="min-h-screen flex items-center justify-center px-4">
      <div className="rounded-xl border border-gray-200 shadow-md overflow-hidden bg-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Productos</h1>
          <Button className='hover:bg-gray-100 transition-colors cursor-pointer rounded-md' onPress={() => openModal()}>Nuevo producto</Button>
        </div>

        <Table isStriped aria-label="Tabla de productos" isCompact 
          classNames={{
            table: 'min-w-full divide-y divide-gray-200',
            th: 'text-left text-gray-600 font-semibold',
            td: 'text-gray-700 text-sm',
          }}
        >
          <TableHeader>
            <TableColumn>Nombre</TableColumn>
            <TableColumn>Categoría</TableColumn>
            <TableColumn>Precio</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Acciones</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={loading}
            items={products}
            emptyContent="No hay productos"
          >
            {(product) => (
              <TableRow className="hover:bg-gray-50 transition-colors" key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusInfo(product.status).color}`}>
                    {getStatusInfo(product.status).label}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Button size='sm' onPress={() => openModal(product)} className='border border-gray rounded-md cursor-pointer'>Editar</Button>
                    <Button
                      color="danger"
                      size="sm"
                      className="border bg-red-200 rounded-md cursor-pointer"
                      onPress={() => handleDelete(product.id!)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <ProductModal onSuccess={fetchProducts} />
      </div>
    </Page>
  );
}

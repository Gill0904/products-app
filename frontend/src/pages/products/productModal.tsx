import { useEffect } from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/modal';
import { Input, Textarea } from '@heroui/input';
import { Button } from '@heroui/button';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProductModal } from '../../store/useProductModal';
import { createProduct, updateProduct } from '../../services/product.service';
import { toast } from 'react-toastify';
import { Product, ProductSchema } from '../../models/product';
import { useAuth } from '../../store/useAuth';

export function ProductModal({ onSuccess }: { onSuccess: () => void }) {
  const { isOpen, closeModal, product } = useProductModal();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      userId: useAuth.getState().user?.userId,
      name: '',
      description: '',
      price: 0,
      status: 'available',
    },
  });

  useEffect(() => {
    if (product) {
      reset(product);
    } else {
      reset({
        userId: useAuth.getState().user?.userId,
        name: '',
        description: '',
        price: 0,
        status: 'available',
      });
    }
  }, [product, reset]);

  const onSubmit = async (values: Product) => {
    try {
      if (product?.id) {
        await updateProduct(product.id, {
            name: values.name,
            description: values.description,
            price: values.price,
            status: values.status,
        });
        toast.success('Producto actualizado');
      } else {
        await createProduct(values);
        toast.success('Producto creado');
      }
      onSuccess();
      closeModal();
    } catch {
      toast.error('Error al guardar el producto');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} backdrop="blur" hideCloseButton>
      <ModalContent className='bg-white p-4 rounded-md shadow-sm space-y-4'>
        <ModalHeader>{product ? 'Editar producto' : 'Nuevo producto'}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre del producto
              </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nombre del producto"
                  errorMessage={errors.name?.message}
                  isInvalid={!!errors.name}
                  color={errors.name ? 'danger' : 'default'}
                />
              )}
            />
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  rows={3}
                  placeholder="Descripción del producto"
                  errorMessage={errors.name?.message}
                  isInvalid={!!errors.name}
                  color={errors.name ? 'danger' : 'default'}
                />
              )}
            />
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Precio
              </label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value.toString()}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  type="number"
                  placeholder="Ej: 99.99"
                  errorMessage={errors.price?.message}
                  isInvalid={!!errors.price}
                  color={errors.price ? 'danger' : 'default'}
                />
              )}
            />
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Estatus
              </label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className={`w-full border rounded px-3 py-2 ${
                    errors.status ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="available">Disponible</option>
                  <option value="out_of_stock">Sin stock</option>
                  <option value="discontinued">Descontinuado</option>
                </select>
              )}
            />
            {errors.status && (
              <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="light" type="button" onPress={closeModal}>
                Cancelar
              </Button>
              <Button color="primary" type="submit" isLoading={isSubmitting}>
                {product ? 'Actualizar' : 'Guardar'}
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export const getStatusInfo = (status: string) => {
  switch (status) {
    case 'available':
      return { label: 'Disponible', color: 'bg-green-100 text-green-800' };
    case 'out_of_stock':
      return { label: 'Sin stock', color: 'bg-yellow-100 text-yellow-800' };
    case 'discontinued':
      return { label: 'Descontinuado', color: 'bg-red-100 text-red-800' };
    default:
      return { label: 'Desconocido', color: 'bg-gray-100 text-gray-800' };
  }
};

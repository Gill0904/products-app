import { useAuth } from '../../store/useAuth';
import { Button } from '@heroui/button';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full bg-white shadow-md px-4 py-2 flex items-center justify-between">
      <h1 className="text-xl font-bold text-blue-600">Productos</h1>
      {user && (
        <div className="flex items-center gap-4">
          <Button size="sm" onPress={logout} color="danger" className='cursor-pointer hover:bg-red-300 transition-colors rounded-md bg-red-200'>
            Cerrar sesión
          </Button>
        </div>
      )}
    </header>
  );
}

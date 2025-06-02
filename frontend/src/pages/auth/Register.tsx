import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Card, CardHeader, CardBody } from '@heroui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerRequest } from '../../services/auth.service';
import { Page } from '../../components/ui/Page';
import { useAuth } from '../../store/useAuth';
import { RegisterForm, registerSchema } from '../../models/auth';

export function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  });

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const { token } = await registerRequest({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      toast.success('Cuenta creada con éxito');
      useAuth.getState().login(token);
      navigate('/products');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Error al registrar');
    }
  };

  return (
    <Page showHeader={false} className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="flex flex-col gap-1 text-center">
          <h2 className="text-2xl font-bold text-blue-600">Crear Cuenta</h2>
          <p className="text-gray-500 text-sm">Completa los campos para registrarte</p>
        </CardHeader>
        <CardBody className="pt-0">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Nombre de usuario */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nombre de usuario
              </label>
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="username"
                    type="text"
                    placeholder="usuario"
                    variant="bordered"
                    radius="sm"
                    size="lg"
                    className="w-full"
                    color={errors.username ? 'danger' : 'default'}
                    isInvalid={!!errors.username}
                    errorMessage={errors.username?.message}
                  />
                )}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="usuario@ejemplo.com"
                    variant="bordered"
                    radius="sm"
                    size="lg"
                    className="w-full"
                    color={errors.email ? 'danger' : 'default'}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    variant="bordered"
                    radius="sm"
                    size="lg"
                    className="w-full"
                    color={errors.password ? 'danger' : 'default'}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar contraseña
              </label>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    variant="bordered"
                    radius="sm"
                    size="lg"
                    className="w-full"
                    color={errors.confirmPassword ? 'danger' : 'default'}
                    isInvalid={!!errors.confirmPassword}
                    errorMessage={errors.confirmPassword?.message}
                  />
                )}
              />
            </div>

            {/* Botones */}
            <Button
              type="submit"
              color="primary"
              className="w-full bg-blue-600 text-white font-semibold text-base py-2 cursor-pointer"
            >
              Registrarme
            </Button>
            <Button
              type="button"
              onPress={() => navigate('/auth/login')}
              color="secondary"
              className="w-full mt-4"
            >
              Iniciar sesión
            </Button>
          </form>
        </CardBody>
      </Card>
    </Page>
  );
}

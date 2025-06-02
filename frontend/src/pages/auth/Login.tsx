import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/useAuth';
import { loginRequest } from '../../services/auth.service';

import { Page } from '../../components/ui/Page';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { useEffect } from 'react';
import { LoginForm, loginSchema } from '../../models/auth';

export function Login() {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const { token } = useAuth.getState();
    if (token) {
      navigate('/products');
    }
  }, []);

  const onSubmit = async (data: LoginForm) => {
    try {
      const { token } = await loginRequest(data);
      useAuth.getState().login(token);
      navigate('/products');
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Credenciales inválidas';
      toast.error(message);
    }

  };

  return (
    <Page showHeader={false} className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="flex flex-col gap-1 text-center">
          <h1 className="text-3xl font-bold text-blue-600">Iniciar Sesión</h1>
          <p className="text-gray-500 text-sm">Accede con tu cuenta para continuar</p>
        </CardHeader>

        <CardBody className="pt-0">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
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
            
            {/* Password */}
            <div className="space-y-2">
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

            {/* Submit Button */}
            <Button
              color="primary"
              className="w-full bg-blue-600 text-white font-semibold text-base py-2 cursor-pointer"
              type="submit"
              radius="sm"
              size="lg"
            >
              Iniciar sesión
            </Button>
          </form>
          <Button type="button" size="sm" className="text-center text-blue-600 hover:text-blue-700 cursor-pointer" onPress={() => navigate('/auth/register')}>
            Registrarse
          </Button>
        </CardBody>
      </Card>
    </Page>
  );
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/login');
    }, []);
  return (
    <main className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Bienvenido a Product App 🚀</h1>
    </main>
  );
}

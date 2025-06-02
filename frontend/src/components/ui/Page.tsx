import { Header } from './Header';

interface PageProps {
  children: React.ReactNode;
  showHeader?: boolean;
  className?: string;
}

export function Page({ children, showHeader = true, className }: PageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && <Header />}
      <main className={`flex-1 ${className}`}>{children}</main>
    </div>
  );
}

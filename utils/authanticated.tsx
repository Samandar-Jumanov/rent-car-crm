import { useAuthSession } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function AuthComponent(props: P) {
    const { status } = useAuthSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'unauthenticated') {
        toast.error('Please log in to access this page');
        router.push('/login');
      }
    }, [status, router]);

    if (status === 'idle' || status === 'unauthenticated') {
      return (
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="text-foreground">Loading...</div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}
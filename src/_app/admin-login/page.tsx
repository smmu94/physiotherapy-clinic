import AdminLoginForm from '@/components/form/adminLoginForm';
import { Suspense } from 'react';
 
export default function LoginPage() {
  return (
    <div className="flex flex-col gap-14 items-center justify-center bg-accent h-full">
      <Suspense>
      <AdminLoginForm />
    </Suspense>
    </div>
    
  );
}
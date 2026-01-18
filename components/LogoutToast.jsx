'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';

export default function LogoutToast() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const loggedOut = searchParams.get('loggedOut');
    
    if (loggedOut === 'true') {
      // Show logout toast after redirect
      Swal.fire({
        icon: 'success',
        title: 'Successfully Logged Out!',
        text: 'You have been logged out successfully',
        showConfirmButton: true,
        timer: 2000,
        timerProgressBar: true,
      });
      // Clean up URL
      window.history.replaceState({}, '', '/');
    }
  }, [searchParams]);

  return null;
}


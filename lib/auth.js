// Authentication utilities

export const MOCK_USER = {
  email: 'admin@shophub.com',
  password: 'admin123',
};

export function isAuthenticated(cookies) {
  // For server-side (using cookies from request)
  if (cookies) {
    const authToken = cookies.get('auth-token');
    return authToken?.value === 'authenticated';
  }
  
  // For client-side
  if (typeof document !== 'undefined') {
    const authToken = getCookie('auth-token');
    return authToken === 'authenticated';
  }
  
  return false;
}

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, value] = cookie.trim().split('=');
    if (cookieName === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

export function login(email, password) {
  if (email === MOCK_USER.email && password === MOCK_USER.password) {
    if (typeof document !== 'undefined') {
      document.cookie = 'auth-token=authenticated;path=/;max-age=604800'; // 7 days
    }
    return true;
  }
  return false;
}

export function logout() {
  if (typeof document !== 'undefined') {
    document.cookie = 'auth-token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
  }
}


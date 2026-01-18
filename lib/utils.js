// Utility functions

export function formatPrice(price) {
  // Format price in Bangladeshi Taka
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getCategories(products) {
  const categories = [...new Set(products.map(product => product.category))];
  return categories;
}

export function getCookie(cookieName) {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

export function setCookie(name, value, days = 7) {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
}

export function deleteCookie(name) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

export function getCategoryColor(category) {
  const colors = {
    electronics: 'bg-blue-600', // Blue
    clothing: 'bg-purple-600', // Purple
    books: 'bg-amber-600', // Amber/Orange
    home: 'bg-green-600', // Green
    sports: 'bg-red-600', // Red
    other: 'bg-gray-600', // Gray
  };
  return colors[category?.toLowerCase()] || colors.other;
}


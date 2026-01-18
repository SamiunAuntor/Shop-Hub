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
    electronics: 'bg-emerald-500/75', // Greenish - transparent
    clothing: 'bg-purple-500/75', // Purple - transparent
    books: 'bg-yellow-500/75', // Yellowish - transparent
    home: 'bg-orange-500/75', // Orangeish - transparent
    sports: 'bg-cyan-500/75', // Cyan/Teal - transparent
    other: 'bg-gray-500/75', // Gray - transparent
  };
  return colors[category?.toLowerCase()] || colors.other;
}


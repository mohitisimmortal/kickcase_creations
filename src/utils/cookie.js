// utils/cookie.js
export function getCookieValue(name) {
    const matches = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return matches ? decodeURIComponent(matches.pop()) : null;
  }
  
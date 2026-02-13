/**
 * Cookie utilities for client-side
 */

export const cookies = {
  /**
   * Set a cookie
   */
  set(name: string, value: string, days: number = 7) {
    const maxAge = days * 24 * 60 * 60; // Convert days to seconds
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
  },

  /**
   * Get a cookie value
   */
  get(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    
    return null;
  },

  /**
   * Delete a cookie
   */
  remove(name: string) {
    document.cookie = `${name}=; path=/; max-age=0`;
  },
};

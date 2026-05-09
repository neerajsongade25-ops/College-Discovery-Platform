'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface WishlistContextType {
  wishlist: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  isWishlisted: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  add: () => {},
  remove: () => {},
  toggle: () => {},
  isWishlisted: () => false,
});

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Hydrate from localStorage on mount (client-only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('college_wishlist');
      if (stored) setWishlist(JSON.parse(stored));
    } catch {}
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem('college_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const add = (id: string) => setWishlist(prev => prev.includes(id) ? prev : [...prev, id]);
  const remove = (id: string) => setWishlist(prev => prev.filter(x => x !== id));
  const toggle = (id: string) => setWishlist(prev =>
    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
  );
  const isWishlisted = (id: string) => wishlist.includes(id);

  return (
    <WishlistContext.Provider value={{ wishlist, add, remove, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);

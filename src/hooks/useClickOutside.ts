import { useEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement>(
  isOpen: boolean, 
  onClose: () => void
) {
  const ref = useRef<T | null>(null);
  
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  return ref;
}

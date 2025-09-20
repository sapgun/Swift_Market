
'use client';

import { AuthProvider } from '../context/AuthContext';
import { SearchProvider } from '../context/SearchContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SearchProvider>
        {children}
      </SearchProvider>
    </AuthProvider>
  );
}

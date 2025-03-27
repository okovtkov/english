import { useEffect } from 'react';
import { api } from '@english/api';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

function QueryProvider({ children }) {
  const queryClient = new QueryClient();

  useEffect(() => {
    api.audio.initiate();
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default QueryProvider;

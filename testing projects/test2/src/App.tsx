import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
    import { Toaster } from 'sonner';
    import AppRouter from '@/routes/AppRouter';
    import GhostCursor from '@/components/ui/GhostCursor';

    const queryClient = new QueryClient();

    function App() {
      return (
        <QueryClientProvider client={queryClient}>
          <GhostCursor color="hsl(330, 50%, 65%)" />
          <AppRouter />
          <Toaster richColors position="top-right" />
        </QueryClientProvider>
      );
    }

    export default App;
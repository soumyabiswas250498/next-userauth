// app/providers.tsx
'use client'
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { store } from "@/src/store/store";
import { Provider } from 'react-redux';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


export function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
        <SessionProvider>
            <Provider store={store}>

                <QueryClientProvider client={queryClient}>
                    {children}
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </Provider>
        </SessionProvider>
    </ThemeProvider>
}
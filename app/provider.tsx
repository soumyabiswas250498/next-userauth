// app/providers.tsx
'use client'
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { store } from "@/src/store/store";
import { Provider } from 'react-redux';


export function Providers({ children }: { children: React.ReactNode }) {
    return <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
        <SessionProvider>
            <Provider store={store}>
                

                {children}
                
            </Provider>
        </SessionProvider>
    </ThemeProvider>
}
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'



export default async function userLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    if (session) {
        console.log('test')
        redirect('/')
    }
    return (
        <section>
            {children}
        </section>
    )
}
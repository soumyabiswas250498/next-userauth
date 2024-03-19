import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'



export default async function userLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    console.log(session)

    if (!session) {
        redirect('/auth/login')
    } else {
        if (session.user.role !== 'admin') {
            redirect('/user/profile')
        }
    }
    return (
        <section>
            {children}
        </section>
    )
}
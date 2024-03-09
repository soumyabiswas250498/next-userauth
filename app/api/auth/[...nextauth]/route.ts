import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginUser } from '@/src/__server__/controllers/users.controller';

 const authOptions = {
    session: {
      strategy: 'jwt',
      secret: process.env.REFRESH_TOKEN_SECRET as string,
      encryption: true
    },
    providers: [
      CredentialsProvider({
        name: 'Credentials',

        credentials: {
          email: { type: 'text' },
          password: { type: 'password' },
        },
        async authorize(credentials, req) {
        try{
            const loggedInUser = await loginUser({
                email: credentials?.email,
                password: credentials?.password,
              });
    
              if (loggedInUser) {
                return loggedInUser;
              } else {
                throw new Error('Something went wrong!')
              }
        }catch(e : any){
            throw new Error(e.message)
        }
          
        },
      }),
    ],
    secret: process.env.REFRESH_TOKEN_SECRET as string,
    callbacks: {
        jwt: async ({ token, user } : any) => {
          if (user) {
            token.email = user.email;
            token.userName = user.username;
            token.role = user.role;
            token.userId = user._id;
            // console.log(user)
          }
    
          return token;
        },
        session: ({ session, token } : any) => {
          if (token) {
            session.user.email = token.email;
            session.user.userName = token.userName;
            session.user.role = token.role;
          }
          return session;
        },
      },
    
  }


  // @ts-ignore
  const handler = NextAuth(authOptions)

export { handler as GET, handler as POST} ;

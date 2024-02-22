import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google'


export const authOptions={
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
        }),
    ],
    pages:{
        signIn:"/"
    },
    debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXT_PUBLIC_SECRET,
    callback:{
        async jwt({ token, user }) {
            console.log("token from next auth:",token)
            return { ...token, ...user };
          },
          async session({ session, token, user }) {
            session.user = token;
            return session;
          },
    },
};

const handler=NextAuth(authOptions)
export {handler as GET , handler as POST}
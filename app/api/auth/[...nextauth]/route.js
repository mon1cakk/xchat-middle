import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

console.log(
    'process.env',
    process.env.TWITTER_ID,
    process.env.TWITTER_SECRET,
    process.env.AUTH_SECRET,
    process.env.NEXTAUTH_URL,
    process.env.NEXT_PUBLIC_GATEWAY_URL,
    process.env.PINATA_JWT,
);
const handler = NextAuth({
    session: { strategy: 'jwt' },
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET,
            client: {
                httpOptions: {
                    timeout: 20000,
                },
            },
            version: '2.0',

            authorization: {
                params: {
                    scope: 'tweet.read users.read follows.read offline.access',
                },
            },
            profile(profile) {
                console.log('profile>>', profile);
                return {
                    id: profile.data.id,
                    name: profile.data.name,
                    screen_name: profile.data.username,
                    image: profile.data.profile_image_url,
                };
            },
        }),
    ],
    cookies: {
      sessionToken: {
        name: `next-auth.session-token`,
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: process.env.NODE_ENV === 'production'
        }
      },
    },
    secret: process.env.AUTH_SECRET,
    debug: process.env.NODE_ENV !== 'production',
    events: {
        signIn: (message) => { console.log('登录成功', message) },
        signOut: (message) => { console.log('登出成功', message) },
        session: (message) => { console.log('会话更新', message) },
    },
    callbacks: {
        async jwt({ token, account, user }) {
            console.log('jwt>>', token, account, user);
            if (account) {
                token.accessToken = account.access_token;
                token.sub = account.providerAccountId;
            }
            if (user) {
                token.user = { ...user };
            }
            console.log('jwt 回调结束 >>', token);
            return token;
        },
        async session({ session, token }) {
            console.log('session>>', session, token);
            if (token?.sub) {
                session.user.id = token.sub;
            }
            session.user = { ...token.user };
            return session;
        },
        async error(error) {
          console.error('NextAuth 错误 >>', error);
      },
    },
});

export { handler as GET, handler as POST };

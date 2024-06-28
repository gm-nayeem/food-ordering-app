import NextAuth from "next-auth";

import { User } from "@/models";
import { authConfig } from "./auth.config";
import { connectToDB } from "@/config/databaseConnect";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
        signOut: '/',
        error: "/login",
    },
    callbacks: {
        async signIn({ account, profile }) {
            try {
                if (account.provider === "credentials") {
                    return true;
                }

                await connectToDB();

                const { name, email } = profile;
                const userExists = await User.findOne({ email });
                // console.log('profile', profile);

                if (!userExists) {
                    const newUser = { username: name, email };

                    if (account.provider === "github") {
                        newUser.image = profile.avatar_url;
                    }

                    if (account.provider === "google") {
                        newUser.image = profile.picture;
                    }

                    await User.create(newUser);
                }

                return true;
            } catch (err) {
                console.error(err);
                return false
            }
        },
        async jwt({ token, user }) {
            if (user) {
                try {
                    const userInfo = await User.findOne({ email: user.email });
                    token.id = userInfo._id;
                    token.isAdmin = userInfo.isAdmin;
                } catch (err) {
                    console.error(err);
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.isAdmin = token.isAdmin;
            }
            return session;
        },
    },
    session: { strategy: 'jwt' },
    ...authConfig,
});
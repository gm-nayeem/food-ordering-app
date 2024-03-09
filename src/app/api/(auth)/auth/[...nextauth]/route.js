import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';

import { User } from "@/models";
import { connectToDB } from "@/config/databaseConnect";

const login = async (credentials) => {
    try {
        await connectToDB();

        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
            throw new Error('Invalid credentials');
        }

        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found!");

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );
        if (!isPasswordCorrect) throw new Error('Invalid credentials');

        return user;
    } catch (err) {
        console.error('auth error', err);
        throw new Error("Failed to login!");
    }
};

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: 'credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "test@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (err) {
                    throw new Error(err);
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
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
    pages: {
        signIn: '/login',
        signOut: '/',
        error: "/login",
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
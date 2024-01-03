import NextAuth, { getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';

import { User, UserInfo } from "@/models";
import { connectToDB } from "@/config/databaseConnect";

export const authOptions = {
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
                    await connectToDB();

                    const email = credentials?.email;
                    const password = credentials?.password;

                    if (!email || !password) {
                        throw new Error('Invalid credentials');
                    }

                    const user = await User.findOne({ email });
                    if (!user) throw new Error("User not found!");

                    const isPasswordOk = user && bcrypt.compareSync(password, user.password);
                    if (!isPasswordOk) throw new Error('Invalid credentials');

                    return user;
                } catch (err) {
                    throw new Error(err);
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    pages: {
        error: "/login",
    },
}

export const isAdmin = async () => {
    try {
        const session = await getServerSession(authOptions);

        const userEmail = session?.user?.email;
        if (!userEmail) return false;

        const userInfo = await UserInfo.findOne({ email: userEmail });
        if (!userInfo) return false;

        return userInfo.isAdmin;
    } catch (err) {
        throw new Error(err);
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
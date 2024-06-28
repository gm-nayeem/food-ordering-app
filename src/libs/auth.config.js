import bcrypt from 'bcryptjs';
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

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

export const authConfig = {
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
};
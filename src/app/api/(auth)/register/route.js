import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/config/databaseConnect";
import { User } from '@/models';

export const POST = async (req) => {
    try {
        await connectToDB();

        const body = await req.json();

        const pass = body.password;
        if (!pass?.length || pass.length < 5) {
            throw new Error('password must be at least 5 characters');
        }

        body.password = await bcrypt.hash(pass, 10);

        const createdUser = await User.create(body);
        return NextResponse.json(createdUser);
    } catch (err) {
        throw new Error(err);
    }
}
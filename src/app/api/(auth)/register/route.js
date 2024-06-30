import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { User } from '@/models';
import { connectToDB } from "@/config/databaseConnect";

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
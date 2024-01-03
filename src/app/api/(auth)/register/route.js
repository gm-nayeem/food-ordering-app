import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectToDB } from "@/config/databaseConnect";
import { User } from "@/models";

export const POST = async (req) => {
    try {
        await connectToDB();

        const body = await req.json();

        const pass = body.password;
        if (!pass?.length || pass.length < 5) {
            throw new Error('password must be at least 5 characters');
        }

        const salt = bcrypt.genSaltSync(10);
        body.password = bcrypt.hashSync(pass, salt);

        const createdUser = await User.create(body);
        return NextResponse.json(createdUser);
    } catch (err) {
        throw new Error(err);
    }
}
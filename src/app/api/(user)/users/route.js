import { NextResponse } from "next/server";

import { User } from "@/models";
import { connectToDB } from "@/config/databaseConnect";

export const GET = async () => {
    try {
        await connectToDB();

        const options = { password: 0 };
        const users = await User.find({}, options);

        return NextResponse.json(users);
    } catch (err) {
        throw new Error(err);
    }
}
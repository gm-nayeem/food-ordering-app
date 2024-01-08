import { NextResponse } from "next/server";
import { isAdmin } from "../../(auth)/auth/[...nextauth]/route";
import { connectToDB } from "@/config/databaseConnect";
import User from "@/models/User";

export const GET = async () => {
    try {
        await connectToDB();

        const options = { password: 0 };

        const admin = await isAdmin();
        if (!admin) throw new Error("Unauthorized access!");

        const users = await User.find({}, options);
        return NextResponse.json(users);
    } catch (err) {
        throw new Error(err);
    }
}
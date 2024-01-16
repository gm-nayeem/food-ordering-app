import { NextResponse } from "next/server";
import { isAdmin } from "../../(auth)/auth/[...nextauth]/route";
import { MenuItem } from "@/models";
import { connectToDB } from "@/config/databaseConnect";

export const POST = async (req) => {
    try {
        await connectToDB();

        const data = await req.json();

        const admin = await isAdmin();
        if (!admin) throw new Error('Unauthorized access!');

        const newMenuItem = await MenuItem.create(data);
        return NextResponse.json(newMenuItem);
    } catch (err) {
        throw new Error(err);
    }
}

export const GET = async () => {
    try {
        await connectToDB();

        const menuItems = await MenuItem.find({});
        return NextResponse.json(menuItems);
    } catch (err) {
        throw new Error(err);
    }
}
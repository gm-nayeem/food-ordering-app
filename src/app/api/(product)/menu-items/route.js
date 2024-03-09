import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../(auth)/auth/[...nextauth]/route";
import { MenuItem } from "@/models";
import { connectToDB } from "@/config/databaseConnect";

export const isAdmin = async () => {
    try {
        const session = await getServerSession(authOptions);

        const admin = session?.user?.isAdmin;
        if (!admin) return false;

        return admin;
    } catch (err) {
        throw new Error(err);
    }
}

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
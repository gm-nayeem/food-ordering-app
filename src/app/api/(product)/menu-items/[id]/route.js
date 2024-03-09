import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/route";
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

export const PUT = async (req, { params }) => {
    const { id } = params;

    try {
        await connectToDB();

        const data = await req.json();

        const admin = await isAdmin();
        if (!admin) throw new Error('Unauthorized access!');

        const isMenuItemExist = await MenuItem.findById(id);
        if (!isMenuItemExist) throw new Error('Menu item not found!');

        await MenuItem.findByIdAndUpdate(id, data, { new: true });
        return NextResponse.json(true);
    } catch (err) {
        throw new Error(err);
    }
}

export const GET = async (req, { params }) => {
    const { id } = params;

    try {
        await connectToDB();

        const menuItem = await MenuItem.findById(id);
        return NextResponse.json(menuItem);
    } catch (err) {
        throw new Error(err);
    }
}

export const DELETE = async (req, { params }) => {
    const { id } = params;

    try {
        await connectToDB();

        const admin = await isAdmin();
        if (!admin) throw new Error('Unauthorized access!');

        const isMenuItemExist = await MenuItem.findById(id);
        if (!isMenuItemExist) throw new Error('Menu item not found!');

        await MenuItem.findByIdAndDelete(id);
        return Response.json({ message: 'Menu item deleted successfull' });
    } catch (err) {
        throw new Error(err);
    }
}
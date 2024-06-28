import { NextResponse } from "next/server";

import { MenuItem } from "@/models";
import { getAdmin } from '@/actions/auth';
import { connectToDB } from "@/config/databaseConnect";

export const POST = async (req) => {
    try {
        await connectToDB();

        const data = await req.json();

        const admin = await getAdmin();
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
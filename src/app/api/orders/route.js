import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { isAdmin, authOptions } from "../(auth)/auth/[...nextauth]/route";
import { connectToDB } from "@/config/databaseConnect";
import { Order } from '@/models';

export const GET = async (req) => {
    try {
        await connectToDB();

        const session = await getServerSession(authOptions);
        const userEmail = session?.user?.email;
        const admin = await isAdmin();

        const url = new URL(req.url);
        const id = url.searchParams.get('id');

        if (id) {
            const orderedItem = await Order.findById(id);
            return NextResponse.json(orderedItem);
        }

        if (admin) {
            const orders = await Order.find({});
            return NextResponse.json(orders);
        }

        if (userEmail) {
            const orderedItem = await Order.find({ userEmail });
            return NextResponse.json(orderedItem);
        }
    } catch (err) {
        throw new Error(err);
    }
}
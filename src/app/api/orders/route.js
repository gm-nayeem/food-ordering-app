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
        const _id = url.searchParams.get('_id');

        if (_id) {
            const orderedItem = await Order.findById(_id);
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
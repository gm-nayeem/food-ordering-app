import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../(auth)/auth/[...nextauth]/route";
import { connectToDB } from "@/config/databaseConnect";
import { Order } from '@/models';

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

export const GET = async () => {
    try {
        await connectToDB();

        // const url = new URL(req?.url);
        // const id = url?.searchParams?.get('id');

        const session = await getServerSession(authOptions);
        const userEmail = session?.user?.email;

        const admin = await isAdmin();
        if (admin) {
            const orders = await Order.find({});
            return NextResponse.json(orders);
        }

        if (userEmail) {
            const orderedItem = await Order.find({ userEmail });
            return NextResponse.json(orderedItem);
        }

        return null;
    } catch (err) {
        throw new Error(err);
    }
}
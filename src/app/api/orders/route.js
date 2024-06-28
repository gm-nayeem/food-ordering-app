import { NextResponse } from "next/server";

import { Order } from '@/models';
import { connectToDB } from "@/config/databaseConnect";
import { currentUser, getAdmin } from '@/actions/auth';

export const GET = async () => {
    try {
        await connectToDB();

        const admin = await getAdmin();
        const cUser = await currentUser();

        if (admin) {
            const orders = await Order.find({});
            return NextResponse.json(orders);
        }

        const userEmail = cUser?.email;
        if (!userEmail) {
            throw new Error("Unauthorized access!");
        }

        const orderedItem = await Order.find({ userEmail });
        return NextResponse.json(orderedItem);
    } catch (err) {
        throw new Error(err);
    }
}
import { NextResponse } from "next/server";

import { Order } from "@/models";
import { connectToDB } from "@/config/databaseConnect";

export const GET = async (req) => {
    try {
        await connectToDB();

        const orders = await Order.find({});
        return NextResponse.json(orders);
    } catch (err) {
        throw new Error(err);
    }
}
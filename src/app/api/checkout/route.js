import { NextResponse } from "next/server";

import { Order } from "@/models";
import { currentUser } from '@/actions/auth';
import { connectToDB } from "@/config/databaseConnect";

export const POST = async (req) => {
    try {
        await connectToDB();

        const { cartProducts, address } = await req.json();

        const cUser = await currentUser();
        const userEmail = cUser?.email;

        const {
            phone,
            streetAddress,
            postalCode,
            city,
            country
        } = address;

        const newOrder = {
            cartProducts,
            userEmail,
            phone,
            streetAddress,
            postalCode,
            city,
            country,
            paid: true
        }

        const createdOrder = await Order.create(newOrder);

        const url = `/orders/${createdOrder._id.toString()}?clear-cart=1`;

        return NextResponse.json({ url });
    } catch (err) {
        throw new Error(err);
    }
}
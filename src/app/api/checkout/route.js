import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../(auth)/auth/[...nextauth]/route";
import { Order } from "@/models";
import { connectToDB } from "@/config/databaseConnect";

export const POST = async (req) => {
    try {
        await connectToDB();

        const { cartProducts, address } = await req.json();
        const session = await getServerSession(authOptions);
        const userEmail = session?.user?.email;

        const newOrder = await Order.create({
            userEmail,
            ...address,
            cartProducts,
            paid: true,
        });

        const url = `/orders/${newOrder._id.toString()}?clear-cart=1`;

        return NextResponse.json({ url });
    } catch (err) {
        throw new Error(err);
    }
}
import { NextResponse } from "next/server";
import { connectToDB } from "@/config/databaseConnect";
import { Order } from '@/models';

export const GET = async (req, { params }) => {
    const orderId = params?.orderId;

    try {
        await connectToDB();

        const order = await Order.findById(orderId);
        if (!order) throw new Error('Order not found');

        return NextResponse.json(order);
    } catch (err) {
        throw new Error(err);
    }
}

// export const DELETE = async ({ params }) => {
//     const orderId = params?.id;

//     try {
//         await connectToDB();

//         const admin = await isAdmin();
//         if (!admin) throw new Error("Unauthorized access!");

//         const user = await Order.findById(orderId);
//         if (!user) throw new Error('Order not found');

//         await Order.findByIdAndDelete(orderId);

//         return NextResponse.json({ message: 'Order deleted successfully' });
//     } catch (err) {
//         throw new Error(err);
//     }
// }
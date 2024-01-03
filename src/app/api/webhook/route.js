// import { NextResponse } from "next/server";
// import { Order } from "@/models";
// const stripe = require('stripe')(process.env.STRIPE_SK);

// export const POST = async (req) => {
//     const sig = req.headers.get('stripe-signature');
//     let event;

//     try {
//         const reqBuffer = await req.text();
//         const signSecret = process.env.STRIPE_SIGN_SECRET;
//         event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
//     } catch (e) {
//         console.error('stripe error');
//         console.log(e);
//         return NextResponse.json(e, { status: 400 });
//     }

//     if (event.type === 'checkout.session.completed') {
//         console.log(event);
//         const orderId = event?.data?.object?.metadata?.orderId;
//         const isPaid = event?.data?.object?.payment_status === 'paid';
//         if (isPaid) {
//             await Order.updateOne({ _id: orderId }, { paid: true });
//         }
//     }

//     return NextResponse.json('ok', { status: 200 });
// }
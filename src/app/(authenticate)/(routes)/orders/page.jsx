'use client';

import Link from "next/link";
import UserTabs from "@/components/UserTabs";
import { dbTimeForHuman } from "@/helper/datetime";
import { useOrders } from "@/hooks/useOrders";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const OrdersPage = () => {
    const { loading, data: orders } = useOrders();

    if (loading) return <LoadingSkeleton />

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs />
            <div className="mt-8">
                {
                    orders?.length > 0 ? (
                        orders.map(order => (
                            <div
                                key={order?._id}
                                className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6"
                            >
                                <div className="grow flex flex-col md:flex-row items-center gap-6">
                                    <div>
                                        <div className={
                                            (order?.paid ? 'bg-green-500' : 'bg-red-400')
                                            + ' p-2 rounded-md text-white w-24 text-center'
                                        }>
                                            {order?.paid ? 'Paid' : 'Not paid'}
                                        </div>
                                    </div>
                                    <div className="grow">
                                        <div className="flex gap-2 items-center mb-1">
                                            <div className="grow">{order?.userEmail}</div>
                                            <div className="text-gray-500 text-sm">{dbTimeForHuman(order.createdAt)}</div>
                                        </div>
                                        <div className="text-gray-500 text-xs">
                                            {order?.cartProducts?.length > 0 && order.cartProducts.map(p => p.name).join(', ')}
                                        </div>
                                    </div>
                                </div>
                                <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                                    <Link href={"/orders/" + order?._id} className="button">
                                        Show order
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center my-4 text-red-500">
                            You haven't ordered yet!
                        </div>
                    )
                }
            </div>
        </section>
    );
}

export default OrdersPage;
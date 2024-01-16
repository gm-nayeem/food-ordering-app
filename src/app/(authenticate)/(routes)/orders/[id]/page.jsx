'use client';

import { useParams, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";

import { CartContext, cartProductPrice } from "@/context/AppContext";
import AddressInputs from "@/components/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useOrder } from "@/hooks/useOrder";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const OrderPage = () => {
    const { id } = useParams();
    const { loading, data: order } = useOrder(id);
    const searchParams = useSearchParams()
    const search = searchParams.get('clear-cart');
    const { clearCart } = useContext(CartContext);

    useEffect(() => {
        if (search === '1') clearCart();
    }, [search]);

    let subtotal = 0;
    if (order?.cartProducts) {
        for (const product of order?.cartProducts) {
            subtotal += cartProductPrice(product);
        }
    }

    if (loading) return <LoadingSkeleton />

    return (
        <section className="max-w-2xl mx-auto mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Your order" />
                <div className="mt-4 mb-8">
                    <p>Thanks for your order.</p>
                    <p>We will call you when your order will be on the way.</p>
                </div>
            </div>
            {order && (
                <div className="grid md:grid-cols-2 md:gap-16">
                    <div>
                        {order.cartProducts.map(product => (
                            <CartProduct key={product._id} product={product} />
                        ))}
                        <div className="text-right py-2 text-gray-500">
                            Subtotal:
                            <span className="text-black font-bold inline-block w-8">${subtotal}</span>
                            <br />
                            Delivery:
                            <span className="text-black font-bold inline-block w-8">$5</span>
                            <br />
                            Total:
                            <span className="text-black font-bold inline-block w-8">
                                ${subtotal + 5}
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <AddressInputs
                                disabled={true}
                                userInfo={order}
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default OrderPage;
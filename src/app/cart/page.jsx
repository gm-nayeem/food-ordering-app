'use client';

import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { CartContext, cartProductPrice } from "@/context/AppContext";
import AddressInputs from "@/components/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useSession } from "next-auth/react";

const CartPage = () => {
    const session = useSession();
    const status = session?.status;

    const { cartProducts, removeCartProduct } = useContext(CartContext);
    const [address, setAddress] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('canceled=1')) {
                toast.error('Payment failed 😔');
            }
        }
    }, []);

    useEffect(() => {
        setLoading(true);

        const fetchProfile = async () => {
            const res = await fetch('/api/profile');
            const data = await res.json();

            if (data) setAddress(data);
            setLoading(false);
        }
        fetchProfile();
    }, []);

    let subtotal = 0;
    for (const p of cartProducts) {
        subtotal += cartProductPrice(p);
    }
    const handleAddressChange = (propName, value) => {
        setAddress(prevAddress => ({ ...prevAddress, [propName]: value }));
    }

    const proceedToCheckout = async (e) => {
        e.preventDefault();

        toast.success('Payment successful');

        // const promise = new Promise((resolve, reject) => {
        //     fetch('/api/checkout', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        //             address,
        //             cartProducts,
        //         }),
        //     }).then(async (response) => {
        //         if (!response.ok) reject();

        //         resolve();
        //         window.location = await response.json();
        //     });
        // });

        // await toast.promise(promise, {
        //     loading: 'Preparing your order...',
        //     success: 'Redirecting to payment...',
        //     error: 'Something went wrong... Please try again later',
        // });
    }

    if (cartProducts?.length === 0) {
        return (
            <section className="mt-8 text-center">
                <SectionHeaders mainHeader="Cart" />
                <p className="mt-4">Your shopping cart is empty 😔</p>
            </section>
        );
    }

    if (loading) return <LoadingSkeleton />

    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart" />
            </div>
            {
                status === 'unauthenticated' ? (
                    <div className="text-center my-4">No products in your shopping cart!!</div>
                ) : (
                    <div className="mt-8 grid gap-8 grid-cols-2">
                        <div>
                            {cartProducts?.length === 0 && (
                                <div>No products in your shopping cart</div>
                            )}
                            {
                                cartProducts?.length > 0 ? (
                                    cartProducts.map((product, index) => (
                                        <CartProduct
                                            key={index}
                                            index={index}
                                            product={product}
                                            onRemove={removeCartProduct}
                                        />
                                    ))
                                ) : null
                            }
                            <div className="py-2 pr-16 flex justify-end items-center">
                                <div className="text-gray-500">
                                    Subtotal:<br />
                                    Delivery:<br />
                                    Total:
                                </div>
                                <div className="font-semibold pl-2 text-right">
                                    ${subtotal}<br />
                                    $5<br />
                                    ${subtotal + 5}
                                </div>
                            </div>
                        </div>
                        <div className="bg-transparent">
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <h2>Checkout</h2>
                                <form onSubmit={proceedToCheckout}>
                                    <AddressInputs
                                        userInfo={address}
                                        handleChange={handleAddressChange}
                                    />
                                    <button type="submit">Pay ${subtotal + 5}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </section>
    );
}

export default CartPage;
'use client'

import { useEffect, useState } from "react";
import { useCurrentUser } from "./useCurrentUser";

export const useOrders = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = useCurrentUser();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // setLoading(true);

                const res = await fetch(`/api/orders`);
                const orders = await res.json();

                if (orders?.length > 0) {

                    if (user?.isAdmin) {
                        setData(orders);
                    } else if (user?.email) {
                        const userOrders = orders.filter((order) => order.userEmail === user.email);
                        setData(userOrders);
                    }
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, [user?.email, user?.isAdmin]);

    return { loading, data };
}
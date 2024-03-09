'use client'

import { useEffect, useState } from "react";

export const useOrders = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);

                const res = await fetch('/api/orders');
                const orders = await res.json();

                if (orders?.length > 0) setData(orders);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    return { loading, data };
}
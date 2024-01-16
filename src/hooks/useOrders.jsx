'use client'

import { useEffect, useState } from "react";

export const useOrders = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        const res = await fetch('/api/orders');
        const orders = await res.json();

        if (orders.length > 0) setData(orders);
        setLoading(false);
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return { loading, data };
}
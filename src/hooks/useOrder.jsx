'use client'

import { useEffect, useState } from "react";

export const useOrder = (id) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            const res = await fetch(`/api/orders?id=${id}`, { cache: 'no-store' });
            const order = await res.json();

            if (order) setData(order);
            setLoading(false);
        }
        fetchOrder();
    }, [id]);

    return { loading, data };
}
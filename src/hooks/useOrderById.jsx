'use client'

import { useEffect, useState } from "react";

export const useOrderById = (id) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);

                const res = await fetch(`/api/orders/${id}`, { cache: 'no-store' });
                const order = await res.json();

                if (order) setData(order);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
        fetchOrder();
    }, [id]);

    return { loading, data };
}
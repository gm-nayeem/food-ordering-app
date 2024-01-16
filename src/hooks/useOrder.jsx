'use client'

import { useEffect, useState } from "react";

export const useOrder = (id) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrder = async () => {
        const res = await fetch(`/api/orders?id=${id}`);
        const order = await res.json();

        if (order) setData(order);
        setLoading(false);
    }

    useEffect(() => {
        fetchOrder();
    }, []);

    return { loading, data };
}
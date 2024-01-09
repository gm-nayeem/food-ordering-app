'use client'

import { useEffect, useState } from "react";

export const useProfile = () => {
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        const res = await fetch('/api/profile');
        const data = await res.json();

        if (data) setLoading(false);
        setData(data);
    }

    useEffect(() => {
        getData();
    }, []);

    return { loading, data };
}
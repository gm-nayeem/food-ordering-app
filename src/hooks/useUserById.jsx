'use client'

import { useEffect, useState } from "react";

export const useUserById = (id) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(`/api/users/${id}`, { cache: 'no-store' });
            const user = await res.json();

            if (user) setData(user);
            setLoading(false);
        }
        fetchUser();
    }, [id]);

    return { loading, data };
}
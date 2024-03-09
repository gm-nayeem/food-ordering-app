'use client'

import { useEffect, useState } from "react";

export const useUsers = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('/api/users');
            const users = await res.json();

            if (users.length > 0) setData(users);
            setLoading(false);
        }
        fetchUsers();
    }, []);

    return { loading, data };
}
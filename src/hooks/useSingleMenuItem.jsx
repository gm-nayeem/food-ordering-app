'use client'

import { useEffect, useState } from "react";

export const useSingleMenuItem = (id) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMenuItem = async () => {
        const res = await fetch(`/api/menu-items`);
        const menuItems = await res.json();

        if (menuItems?.length > 0) {
            const menuItem = menuItems.find(item => item._id === id);
            setData(menuItem);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchMenuItem();
    }, []);

    return { loading, data };
}
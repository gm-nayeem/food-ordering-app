'use client'

import { useEffect, useState } from "react";

export const useMenuItems = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMenuItems = async () => {
        const res = await fetch('/api/menu-items');
        const menuItems = await res.json();

        if (menuItems.length > 0) setData(menuItems);
        setLoading(false);
    }

    useEffect(() => {
        fetchMenuItems();
    }, []);

    return { loading, data };
}
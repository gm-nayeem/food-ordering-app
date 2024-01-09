'use client'

import { useEffect, useState } from "react";

export const useCategories = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        const res = await fetch('/api/categories');
        const categories = await res.json();

        if (categories.length > 0) setData(categories);
        setLoading(false);
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return { loading, data };
}
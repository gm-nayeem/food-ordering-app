'use client';

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import UserTabs from "@/components/UserTabs";
import CategoriesComponents from "../../_components/CategoriesComponents";
import CategoryForm from "../../_components/CategoryForm";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [editedCategory, setEditedCategory] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        const res = await fetch('/api/categories');
        const data = await res.json();

        setCategories(data);
        setLoading(false);
    }

    const handleCategorySubmit = async (e) => {
        e.preventDefault();

        const data = { name: categoryName };

        if (editedCategory) data.id = editedCategory._id;

        const promise = fetch('/api/categories', {
            method: editedCategory ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).then(res => {
            if (!res.ok) throw new Error('Something went wrong!');

            return res.json().then(category => {
                setCategoryName('');

                if (editedCategory) {
                    setCategories(prev => (
                        prev.map(cat => {
                            if (cat._id === editedCategory._id) return category;
                            return cat;
                        })
                    ));
                } else {
                    setCategories(prev => [category, ...prev]);
                }

                setEditedCategory(null);
            });
        });

        await toast.promise(promise, {
            loading: editedCategory
                ? 'Updating category...'
                : 'Creating your new category...',
            success: editedCategory ? 'Category updated' : 'Category created',
            error: 'Error, sorry...',
        });
    }

    const handleCategoryDelete = async (catId) => {
        const promise = fetch(`/api/categories?id=${catId}`, {
            method: 'DELETE',
        }).then(res => {
            if (!res.ok) throw new Error('Something went wrong!');

            return res.json().then(() => {
                setCategories(prev => (
                    prev.filter(cat => cat._id !== catId)
                ));
            });
        })

        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Category deleted!',
            error: 'Error occurred while deleting the category',
        });
    }

    if (loading) return <LoadingSkeleton />

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs />
            <CategoryForm
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                editedCategory={editedCategory}
                setEditedCategory={setEditedCategory}
                handleCategorySubmit={handleCategorySubmit}
            />
            <CategoriesComponents
                categories={categories}
                handleCategoryDelete={handleCategoryDelete}
                setCategoryName={setCategoryName}
                setEditedCategory={setEditedCategory}
            />
        </section>
    );
}

export default CategoriesPage;
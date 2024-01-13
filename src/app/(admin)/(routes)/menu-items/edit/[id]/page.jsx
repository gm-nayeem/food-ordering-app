'use client'

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

import DeleteButton from "@/components/DeleteButton";
import Left from "@/components/icons/Left";
import MenuItemForm from "@/app/(admin)/_components/MenuItemForm";
import UserTabs from "@/components/UserTabs";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useSingleMenuItem } from "@/hooks/useSingleMenuItem";

const EditMenuItemPage = () => {
    const router = useRouter();
    const { id } = useParams();
    const { loading, data: menuItem } = useSingleMenuItem(id);

    const handleFormSubmit = async (e, data) => {
        e.preventDefault();

        const savingPromise = new Promise(async (resolve, reject) => {
            const res = await fetch(`/api/menu-items/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) reject();
            resolve();
        });

        await toast.promise(savingPromise, {
            loading: 'Saving this tasty item',
            success: 'Saved!',
            error: 'Error',
        });

        router.push('/menu-items');
    }

    const handleDeleteClick = async () => {
        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch(`/api/menu-items/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) reject();
            resolve();
        });

        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Deleted!',
            error: 'Error',
        });

        router.push('/menu-items');
    }

    if (loading) return <LoadingSkeleton />

    return (
        <section className="mt-8">
            <UserTabs />
            <div className="max-w-2xl mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    <Left />
                    <span>Show all menu items</span>
                </Link>
            </div>
            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
            <div className="max-w-md mx-auto mt-2">
                <div className="max-w-xs ml-auto pl-4">
                    <DeleteButton
                        label="Delete this menu item"
                        onDelete={handleDeleteClick}
                    />
                </div>
            </div>
        </section>
    );
}

export default EditMenuItemPage;
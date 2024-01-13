'use client';

import Image from "next/image";
import Link from "next/link";
import Right from "@/components/icons/Right";
import UserTabs from '@/components/UserTabs';
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useMenuItems } from '@/hooks/useMenuItems';


const MenuItemsPage = () => {
    const { loading, data } = useMenuItems();

    if (loading) return <LoadingSkeleton />

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs />
            <div className="mt-8">
                <Link
                    className="button flex"
                    href={'/menu-items/new'}>
                    <span>Create new menu item</span>
                    <Right />
                </Link>
            </div>

            <div>
                <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
                <div className="grid grid-cols-3 gap-2">
                    {
                        data?.length > 0 ? (
                            data.map(item => (
                                <Link
                                    key={item._id}
                                    href={`/menu-items/edit/${item._id}`}
                                    className="bg-gray-200 rounded-lg p-4"
                                >
                                    <div className="relative">
                                        <Image
                                            className="rounded-md"
                                            src={item.image} alt='item' width={200} height={200}
                                        />
                                    </div>
                                    <div className="text-center">
                                        {item.name}
                                    </div>
                                </Link>
                            ))
                        ) : null
                    }
                </div>
            </div>
        </section>
    );
}

export default MenuItemsPage;
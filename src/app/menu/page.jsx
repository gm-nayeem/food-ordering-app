'use client';

import LoadingSkeleton from "@/components/LoadingSkeleton";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useCategories } from "@/hooks/useCategories";
import { useMenuItems } from "@/hooks/useMenuItems";

export default function MenuPage() {
    const { loading, data: categories } = useCategories();
    const { data: menuItems } = useMenuItems();

    if (loading) return <LoadingSkeleton />

    return (
        <section className="mt-8">
            {
                categories.length > 0 ? (
                    categories.map(cat => (
                        <div key={cat._id}>
                            <div className="text-center">
                                <SectionHeaders mainHeader={cat.name} />
                            </div>
                            <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
                                {
                                    menuItems.length > 0 ? (
                                        menuItems.filter(item => item.category === cat._id).map(item => (
                                            <MenuItem key={item._id} item={item} />
                                        ))
                                    ) : null
                                }
                            </div>
                        </div>
                    ))
                ) : null
            }
        </section>
    );
}
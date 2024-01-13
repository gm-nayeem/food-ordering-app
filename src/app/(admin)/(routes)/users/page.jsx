'use client'

import Link from "next/link";
import UserTabs from "@/components/UserTabs";
import { useUsers } from "@/hooks/useUsers";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const UsersPage = () => {
    const { loading, data } = useUsers();

    if (loading) return <LoadingSkeleton />

    return (
        <section className="max-w-2xl mx-auto mt-8">
            <UserTabs />
            <div className="mt-8">
                {
                    data?.length > 0 ? (
                        data.map(user => (
                            <div
                                key={user._id}
                                className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                                    <div className="text-gray-900">
                                        <span>{user.username ? user.username : <i>No Name</i>}</span>
                                    </div>
                                    <span className="text-gray-500">{user.email}</span>
                                </div>
                                <div>
                                    <Link className="button" href={`/users/${user._id}`}>
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : null
                }
            </div>
        </section>
    );
}

export default UsersPage;
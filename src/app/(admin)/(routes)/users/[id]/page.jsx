'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import UserForm from "@/components/UserForm";
import UserTabs from "@/components/UserTabs";
import { useProfile } from "@/hooks/useProfile";

const EditUserPage = () => {
    const { loading, data } = useProfile();
    const [user, setUser] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchUserById = async () => {
            const res = await fetch(`/api/profile?_id=${id}`);
            const data = await res.json();

            data && setUser(user);
        }
        fetchUserById();
    }, []);

    const handleSaveButtonClick = async (e, data) => {
        e.preventDefault();

        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, _id: id }),
            });

            if (!res.ok) reject();
            resolve();
        });

        await toast.promise(promise, {
            loading: 'Saving user...',
            success: 'User saved',
            error: 'An error has occurred while saving the user',
        });
    }

    if (loading) {
        return <div className="text-center">Loading...</div>
    }

    return (
        <section className="mt-8 mx-auto max-w-2xl">
            <UserTabs />
            <div className="mt-8">
                <UserForm user={user} onSave={handleSaveButtonClick} />
            </div>
        </section>
    );
}

export default EditUserPage;
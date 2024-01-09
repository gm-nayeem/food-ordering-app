'use client';

import toast from "react-hot-toast";
import UserForm from "@/components/UserForm";
import UserTabs from "@/components/UserTabs";
import { useUserById } from "@/hooks/useUserById";

const EditUserPage = ({ params }) => {
    const id = params.id;
    const { loading, data } = useUserById(id);

    const handleSaveButtonClick = async (e, userInfo) => {
        e.preventDefault();

        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch(`/api/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfo),
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
                <UserForm user={data} onSave={handleSaveButtonClick} />
            </div>
        </section>
    );
}

export default EditUserPage;
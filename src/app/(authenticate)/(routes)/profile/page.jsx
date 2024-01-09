'use client';

import toast from "react-hot-toast";
import UserForm from "@/components/UserForm";
import UserTabs from "@/components/UserTabs";
import { useProfile } from "@/hooks/useProfile";


const ProfilePage = () => {
    const { loading, data } = useProfile();

    const handleProfileInfoUpdate = async (e, userInfo) => {
        e.preventDefault();

        const promise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfo),
            });

            if (!response.ok) reject();
            resolve();
        });

        await toast.promise(promise, {
            loading: 'Saving profile...',
            success: 'Profile saved',
            error: 'An error has occurred while saving the profile',
        });
    }

    if (loading) {
        return <div className="text-center">Loading...</div>
    }

    return (
        <section className="mt-8">
            <UserTabs />
            <div className="max-w-2xl mx-auto mt-8">
                <UserForm user={data} onSave={handleProfileInfoUpdate} />
            </div>
        </section>
    );
}

export default ProfilePage;
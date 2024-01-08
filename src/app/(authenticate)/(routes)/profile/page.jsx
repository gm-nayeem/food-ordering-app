'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

import UserForm from "@/components/UserForm";
import UserTabs from "@/components/UserTabs";


const ProfilePage = () => {
    const session = useSession();
    const { status } = session;

    const [user, setUser] = useState(null);
    const [profileFetched, setProfileFetched] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await fetch('/api/profile');
            const data = await res.json();

            if (data) {
                setUser(data);
                setProfileFetched(true);
            }
        }

        fetchProfile();
    }, []);

    const handleProfileInfoUpdate = async (e, data) => {
        e.preventDefault();

        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Something went wrong!');
    }

    if (status === 'loading' || !profileFetched) {
        return <div className="text-center">Loading...</div>
    }

    return (
        <section className="mt-8">
            <UserTabs />
            <div className="max-w-2xl mx-auto mt-8">
                <UserForm user={user} onSave={handleProfileInfoUpdate} />
            </div>
        </section>
    );
}

export default ProfilePage;
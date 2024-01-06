"use client";

import Link from "next/link";
import { useState } from "react";
import UserForm from "../../_components/UserForm";

const RegisterPage = () => {
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e, user) => {
        e.preventDefault();

        setCreatingUser(true);
        setError(false);
        setUserCreated(false);

        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) setError(true);

        setUserCreated(true);
        setCreatingUser(false);
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Register
            </h1>
            {userCreated && (
                <div className="my-4 text-center">
                    User created.<br />
                    Now you can{' '}
                    <Link className="underline" href={'/login'}>Login &raquo;</Link>
                </div>
            )}
            {error && (
                <div className="my-4 text-center">
                    An error has occurred.<br />
                    Please try again later
                </div>
            )}
            <UserForm
                name='Register'
                text='Already have an account?'
                authProcessing={creatingUser}
                handleSubmit={handleSubmit}
            />
        </section>
    );
}

export default RegisterPage;
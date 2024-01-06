'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import UserForm from "../../_components/UserForm";

const LoginPage = () => {
    const [loginInProgress, setLoginInProgress] = useState(false);

    const handleSubmit = async (e, user) => {
        e.preventDefault();

        setLoginInProgress(true);

        const {
            email, password
        } = user;

        await signIn('credentials', { email, password, callbackUrl: '/' });

        setLoginInProgress(false);
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Login
            </h1>
            <UserForm
                name='Login'
                text='Don&rsquo;t have an account?'
                authProcessing={loginInProgress}
                handleSubmit={handleSubmit}
            />
        </section>
    );
}

export default LoginPage;
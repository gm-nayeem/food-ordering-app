'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import AuthForm from "../../_components/AuthForm";

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
            <AuthForm
                name='Login'
                text='Don&rsquo;t have an account?'
                authProcessing={loginInProgress}
                handleSubmit={handleSubmit}
            />
        </section>
    );
}

export default LoginPage;
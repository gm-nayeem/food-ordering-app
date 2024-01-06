'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";

const UserForm = ({ name, text, authProcessing, handleSubmit }) => {
    const [user, setUser] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser(prev => (
            {
                ...prev,
                [name]: value
            }
        ));
    }

    return (
        <div>
            <form className="block max-w-xs mx-auto" onSubmit={(e) => handleSubmit(e, user)}>
                <input type="email" name="email" placeholder="email" value={user.email}
                    required
                    disabled={authProcessing}
                    onChange={handleChange} />
                <input type="password" name="password" placeholder="password" value={user.password}
                    required
                    disabled={authProcessing}
                    onChange={handleChange} />
                <button type="submit" disabled={authProcessing}>
                    {name}
                </button>
                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>
                <button
                    type="button"
                    onClick={() => signIn('github', { callbackUrl: '/' })}
                    className="mb-4 flex gap-4 justify-center">
                    <Image src={'/github.png'} alt={''} width={24} height={24} />
                    Login with github
                </button>
                <button
                    type="button"
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt={''} width={24} height={24} />
                    Login with google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    {`${text} `}
                    <Link
                        className="underline"
                        href={name === 'Login' ? '/register' : '/login'}
                    >
                        {name === 'Login' ? 'Register' : 'Login'} here &raquo;
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default UserForm;
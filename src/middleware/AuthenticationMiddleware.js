'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const AuthenticationMiddleware = ({ children }) => {
    const session = useSession();
    const status = session?.status;

    if (status === 'unauthenticated') return redirect('/login');

    return (
        <div>
            {children}
        </div>
    )
}

export default AuthenticationMiddleware;
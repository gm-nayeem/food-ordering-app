'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const AuthMiddleware = ({ children }) => {
    const session = useSession();
    const status = session?.status;

    if (status === 'authenticated') return redirect('/');

    return (
        <div>
            {children}
        </div>
    )
}

export default AuthMiddleware;
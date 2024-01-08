'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const AdminMiddleware = ({ children }) => {
    const session = useSession();
    const status = session?.status;
    const isAdmin = session?.data?.user?.isAdmin;

    if (status === 'unauthenticated') return redirect('/');
    if (status === 'authenticated' && !isAdmin) return redirect('/');

    return (
        <div>
            {children}
        </div>
    )
}

export default AdminMiddleware;
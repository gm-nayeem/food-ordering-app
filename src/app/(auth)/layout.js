'use client'

import AuthMiddleware from "@/middleware/AuthMiddleware";

export default function AuthLayout({ children }) {

    return (
        <div>
            <AuthMiddleware>
                {children}
            </AuthMiddleware>
        </div>
    )
}
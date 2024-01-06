import AuthMiddleware from "@/middleware";

export default function AuthLayout({ children }) {

    return (
        <div>
            <AuthMiddleware>
                {children}
            </AuthMiddleware>
        </div>
    )
}
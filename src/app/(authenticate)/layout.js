import AuthenticationMiddleware from "@/middleware/AuthenticationMiddleware";

export default function AuthenticateLayout({ children }) {

    return (
        <AuthenticationMiddleware>
            {children}
        </AuthenticationMiddleware>
    )
}
import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex flex-col gap-2 items-center">
            <h2 className="text-lg font-bold">Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link href="/" className="underline text-blue-500">Return To Home</Link>
        </div>
    )
}

export default NotFound;
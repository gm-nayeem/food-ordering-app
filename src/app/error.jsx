'use client'

import { useEffect } from 'react';

export default function Error({ error, reset, }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col gap-2 items-center">
            <h2 className="text-lg font-bold">Something went wrong!</h2>
            <button
                className="bg-red-500 text-white w-max px-4 py-1 rounded-sm shadow-sm hover:bg-red-400 cursor-pointer"
                onClick={() => reset()}
            >
                Try again
            </button>
        </div>
    )
}
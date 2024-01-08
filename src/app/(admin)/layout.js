'use client'

import AdminMiddleware from '@/middleware/AdminMiddleware';

export default function AdminLayout({ children }) {
    return (
        <AdminMiddleware>
            {children}
        </AdminMiddleware>
    )
}
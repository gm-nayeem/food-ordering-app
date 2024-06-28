import { auth } from '@/libs/auth';

export const currentUser = async () => {
    const session = await auth();

    return session?.user;
}

export const getAdmin = async () => {
    const session = await auth();

    return session?.user?.isAdmin;
}
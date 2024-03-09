import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../(auth)/auth/[...nextauth]/route";
import { connectToDB } from "@/config/databaseConnect";
import User from "@/models/User";

// export const isAdmin = async () => {
//     try {
//         const session = await getServerSession(authOptions);

//         const admin = session?.user?.isAdmin;
//         if (!admin) return false;

//         return admin;
//     } catch (err) {
//         throw new Error(err);
//     }
// }

export const GET = async () => {
    try {
        await connectToDB();

        // const admin = await isAdmin();
        // if (!admin) throw new Error("Unauthorized access!");

        const options = { password: 0 };
        const users = await User.find({}, options);

        if (!users) {
            return NextResponse.error();
        }

        return NextResponse.json(users);
    } catch (err) {
        throw new Error(err);
    }
}
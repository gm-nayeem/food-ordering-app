import { NextResponse } from "next/server";
import { isAdmin } from "@/app/api/(auth)/auth/[...nextauth]/route";
import { connectToDB } from "@/config/databaseConnect";
import { User, UserInfo } from "@/models";

export const GET = async (req, { params }) => {
    const userId = params?.id;

    // get the user id from the query parameters
    // const url = new URL(req.url);
    // const _id = url.searchParams.get('_id');

    try {
        await connectToDB();

        const admin = await isAdmin();
        if (!admin) throw new Error("Unauthorized access!");

        const options = { password: 0 };

        const user = await User.findById(userId, options).lean();
        if (!user) throw new Error('User not found');

        const userInfo = await UserInfo.findOne({ email: user.email }).lean();
        return NextResponse.json({ ...user, ...userInfo });
    } catch (err) {
        throw new Error(err);
    }
}

export const PUT = async (req, { params }) => {
    const userId = params?.id;

    try {
        await connectToDB();

        const admin = await isAdmin();
        if (!admin) throw new Error("Unauthorized access!");

        const data = await req.json();
        const { username, image, ...otherUserInfo } = data;

        const options = { password: 0 };

        const user = await User.findById(userId, options);
        if (!user) throw new Error('User not found');

        const updates = {};
        if (username) updates.username = username;
        if (image && image !== user.image) updates.image = image;

        if (Object.keys(updates).length > 0) {
            await User.findByIdAndUpdate(userId, updates, { new: true });
        }

        if (Object.keys(otherUserInfo).length > 0) {
            await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, { upsert: true });
        }

        return NextResponse.json({ message: 'User updated successfully' });
    } catch (err) {
        throw new Error(err);
    }
}

export const DELETE = async (req, { params }) => {
    const userId = params?.id;

    try {
        await connectToDB();

        const admin = await isAdmin();
        if (!admin) throw new Error("Unauthorized access!");

        const options = { password: 0 };

        const user = await User.findById(userId, options);
        if (!user) throw new Error('User not found');

        await User.findByIdAndDelete(userId);
        await UserInfo.deleteOne({ email: user.email });

        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (err) {
        throw new Error(err);
    }
}
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../(auth)/auth/[...nextauth]/route";
import { connectToDB } from "@/config/databaseConnect";
import { User, UserInfo } from "@/models";

export const PUT = async (req) => {
    try {
        await connectToDB();

        const data = await req.json();
        const { username, image, ...otherUserInfo } = data;

        const options = { password: 0 };
        const session = await getServerSession(authOptions);

        const email = session?.user?.email;
        if (!email) return NextResponse.json({});

        const user = await User.findOne({ email }, options);
        if (!user) throw new Error('User not found');

        const updates = {};
        if (username) updates.username = username;
        if (image && image !== user.image) updates.image = image;

        if (Object.keys(updates).length > 0) {
            await User.findOneAndUpdate({ email }, updates, { new: true });
        }

        if (Object.keys(otherUserInfo).length > 0) {
            await UserInfo.findOneAndUpdate({ email }, otherUserInfo, { upsert: true });
        }

        return NextResponse.json({ message: 'Profile updated successfully' });
    } catch (err) {
        throw new Error(err);
    }
}

export const GET = async (req) => {
    try {
        await connectToDB();

        const options = { password: 0 };
        const session = await getServerSession(authOptions);

        const email = session?.user?.email;
        if (!email) return NextResponse.json({});

        const user = await User.findOne({ email }, options).lean();
        if (!user) throw new Error('User not found');

        const userInfo = await UserInfo.findOne({ email: user.email }).lean();

        return NextResponse.json({ ...user, ...userInfo });
    } catch (err) {
        throw new Error(err);
    }
}
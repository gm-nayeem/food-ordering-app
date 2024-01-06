import { authOptions } from "../../(auth)/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDB } from "@/config/databaseConnect";
import { User, UserInfo } from "@/models";

export const PUT = async (req) => {
    try {
        await connectToDB();

        const data = await req.json();
        const { _id, name, image, ...otherUserInfo } = data;

        const options = { password: 0 };
        let filter = {};

        if (_id) {
            filter = { _id };
        } else {
            const session = await getServerSession(authOptions);

            const email = session?.user?.email;
            if (!email) return NextResponse.json({});

            filter = { email };
        }

        const user = await User.findOne(filter, options);
        if (!user) throw new Error('User not found');

        await User.updateOne(filter, { name, image });
        await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, { upsert: true });

        return NextResponse.json(true);
    } catch (err) {
        throw new Error(err);
    }
}

export const GET = async (req) => {
    try {
        await connectToDB();

        const url = new URL(req.url);
        const _id = url.searchParams.get('_id');

        const options = { password: 0 };
        let filter = {};

        if (_id) {
            filter = { _id };
        } else {
            const session = await getServerSession(authOptions);

            const email = session?.user?.email;
            if (!email) return NextResponse.json({});

            filter = { email };
        }

        const user = await User.findOne(filter, options).lean();
        const userInfo = await UserInfo.findOne({ email: user.email }).lean();

        return NextResponse.json({ ...user, ...userInfo });
    } catch (err) {
        throw new Error(err);
    }
}
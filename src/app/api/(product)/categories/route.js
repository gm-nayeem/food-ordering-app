import { isAdmin } from "@/app/api/auth/[...nextauth]";
import { NextResponse } from "next/server";
import { Category } from "@/models/Category";
import { connectToDB } from "@/config/databaseConnect";

export const POST = async (req) => {
    try {
        await connectToDB();

        const { name } = await req.json();

        const admin = await isAdmin();
        if (!admin) throw new Error('Unauthorized access!');

        const categoryDoc = await Category.create({ name });
        return NextResponse.json(categoryDoc);
    } catch (err) {
        throw new Error(err);
    }
}

export const PUT = async (req) => {
    try {
        await connectToDB();

        const { _id, name } = await req.json();

        const admin = await isAdmin();
        if (!admin) throw new Error('Unauthorized access!');

        await Category.updateOne({ _id }, { name });
        return NextResponse.json(true);
    } catch (err) {
        throw new Error(err);
    }
}

export const GET = async () => {
    try {
        await connectToDB();

        const categories = await Category.find();
        return NextResponse.json(categories);
    } catch (err) {
        throw new Error(err);
    }
}

export const DELETE = async (req) => {
    try {
        await connectToDB();

        const url = new URL(req.url);
        const _id = url.searchParams.get('_id');

        const admin = await isAdmin();
        if (!admin) throw new Error('Unauthorized access!');

        await Category.deleteOne({ _id });
        return NextResponse.json(true);
    } catch (err) {
        throw new Error(err);
    }
}
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdmin } from "../../(auth)/auth/[...nextauth]/route";
import { Category } from "@/models";
import { connectToDB } from "@/config/databaseConnect";

export const POST = async (req) => {
    try {
        await connectToDB();

        const { name } = await req.json();

        const admin = await isAdmin();
        if (!admin) throw new Error('Unauthorized access!');

        const newCategory = await Category.create({ name });

        // revalidatePath('/categories');
        return NextResponse.json(newCategory);
    } catch (err) {
        throw new Error(err);
    }
}

export const PUT = async (req) => {
    try {
        await connectToDB();

        const { name, id } = await req.json();

        const admin = await isAdmin();
        if (!admin) throw new Error('Unauthorized access!');

        const updatedCat = await Category.findByIdAndUpdate(id, { name }, { new: true });
        return NextResponse.json(updatedCat);
    } catch (err) {
        throw new Error(err);
    }
}

export const GET = async () => {
    try {
        await connectToDB();

        const admin = await isAdmin();
        if (!admin) throw new Error('Unauthorized access!');

        const categories = await Category.find({});
        return NextResponse.json(categories);
    } catch (err) {
        throw new Error(err);
    }
}

export const DELETE = async (req) => {
    try {
        await connectToDB();

        const url = new URL(req.url);
        const catId = url.searchParams.get('id');

        const admin = await isAdmin();
        if (!admin) throw new Error('Unauthorized access!');

        await Category.findByIdAndDelete(catId);

        revalidatePath('/categories');
        return NextResponse.json({ message: 'Category deleted successfully' });
    } catch (err) {
        throw new Error(err);
    }
}
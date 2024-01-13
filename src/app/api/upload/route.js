import uniqid from 'uniqid';
import { NextResponse } from "next/server";
import { uploadFileToCloudinary } from '@/helper/fileUpload';

export const POST = async (req) => {
    try {
        const data = await req.formData();

        const file = data.get('file');
        if (!file) throw new Error('File not found');

        const newFileName = uniqid() + '-' + file.name;
        const fileUrl = await uploadFileToCloudinary(newFileName);

        return NextResponse.json({ fileUrl });
    } catch (err) {
        throw new Error(err);
    }
}
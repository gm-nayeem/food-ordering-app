import Image from "next/image";
import toast from "react-hot-toast";

const DEFAULT_IMG = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

const EditableImage = ({ link, setLink }) => {

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) throw new Error('File not found!');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'food_ordering_app');

        const api = "https://api.cloudinary.com/v1_1/gmnayeem/image/upload";

        const uploadPromise = fetch(api, {
            method: 'POST',
            body: formData,
        }).then(res => {
            if (!res.ok) throw new Error('Something went wrong');
            return res.json().then(data => {
                setLink(data.secure_url);
            });
        });

        await toast.promise(uploadPromise, {
            loading: 'Uploading...',
            success: 'Upload completed!',
            error: 'Upload error',
        });
    }

    return (
        <>
            {
                link ? (
                    <Image
                        src={link} width={250} height={250}
                        alt={'avatar'}
                        className="rounded-sm"
                    />
                ) : (
                    <Image
                        src={DEFAULT_IMG} width={250} height={250}
                        alt={'default'}
                        className="rounded-sm"
                    />
                )
            }
            <label>
                <input type="file" className="hidden" onChange={handleFileChange} />
                <span className="block border border-gray-300 rounded-lg mt-2 p-2 text-center cursor-pointer">Change Profile</span>
            </label>
        </>
    );
}

export default EditableImage;
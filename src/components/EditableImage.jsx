import Image from "next/image";
import toast from "react-hot-toast";

const DEFAULT_IMG = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

const EditableImage = ({ link, setLink }) => {

    const handleFileChange = async (e) => {
        const files = e.target.files;

        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);

            const uploadPromise = fetch('/api/upload', {
                method: 'POST',
                body: data,
            }).then(res => {
                if (!res.ok) throw new Error('Something went wrong');

                return res.json().then(link => {
                    setLink(link);
                });
            });

            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Upload complete',
                error: 'Upload error',
            });
        }
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
'use client';

import { useState } from "react";
import AddressInputs from "./AddressInputs";
import EditableImage from "./EditableImage";

const UserForm = ({ user, onSave }) => {
    // const {
    //     username, isAdmin, phone,
    //     country, city, streetAddress, postalCode
    // } = user;

    const [userInfo, setUserInfo] = useState({
        username: user?.username || '',
        phone: user?.phone || '',
        country: user?.country || '',
        city: user?.city || '',
        streetAddress: user?.streetAddress || '',
        postalCode: user?.postalCode || '',
    });
    const [image, setImage] = useState(user?.image || '');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserInfo(prev => (
            {
                ...prev,
                [name]: value
            }
        ));
    }

    return (
        <div className="md:flex gap-4">
            <div>
                <div className="p-2 rounded-lg relative max-w-[160px]">
                    <EditableImage link={image} setLink={setImage} />
                </div>
            </div>
            <form
                className="grow"
                onSubmit={e => onSave(e, { ...userInfo, image })}
            >
                <label>
                    Full Name
                </label>
                <input
                    type="text"
                    name="username"
                    placeholder="full name"
                    value={userInfo.username}
                    onChange={handleChange}
                />
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder='email address'
                    value={user?.email}
                    disabled={true}
                />
                <AddressInputs
                    userInfo={userInfo}
                    handleChange={handleChange}
                />
                {user?.isAdmin && (
                    <div>
                        <label className="p-2 inline-flex items-center gap-2 mb-2">
                            <input
                                type="checkbox"
                                value={'1'}
                                checked={user?.isAdmin}
                                readOnly
                            />
                            <span>Admin</span>
                        </label>
                    </div>
                )}
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default UserForm;
'use client';

import { useState } from "react";
import AddressInputs from "./AddressInputs";
import EditableImage from "./EditableImage";

const UserForm = ({ user, onSave }) => {
    const {
        username, email, isAdmin, phone,
        country, city, streetAddress, postalCode
    } = user;

    const [userInfo, setUserInfo] = useState({
        username: username || '',
        phone: phone || '',
        country: country || '',
        city: city || '',
        streetAddress: streetAddress || '',
        postalCode: postalCode || '',
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
                    value={userInfo?.username}
                    onChange={handleChange}
                />
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder='email address'
                    value={email}
                    disabled={true}
                />
                <AddressInputs
                    userInfo={userInfo}
                    handleChange={handleChange}
                />
                {isAdmin && (
                    <div>
                        <label className="p-2 inline-flex items-center gap-2 mb-2">
                            <input
                                type="checkbox"
                                value={'1'}
                                checked={isAdmin}
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
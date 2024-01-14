const AddressInputs = ({ userInfo, handleChange, disabled = false }) => {

    return (
        <>
            <label>Phone</label>
            <input
                disabled={disabled}
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={userInfo?.phone}
                onChange={handleChange} />
            <label>Street address</label>
            <input
                disabled={disabled}
                type="text"
                name="streetAddress"
                placeholder="Street address"
                value={userInfo?.streetAddress}
                onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label>Postal code</label>
                    <input
                        disabled={disabled}
                        type="text"
                        name="postalCode"
                        placeholder="Postal code"
                        value={userInfo?.postalCode}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>City</label>
                    <input
                        disabled={disabled}
                        type="text"
                        name="city"
                        placeholder="City"
                        value={userInfo?.city}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <label>Country</label>
            <input
                disabled={disabled}
                type="text"
                name="country"
                placeholder="Country"
                value={userInfo?.country}
                onChange={handleChange}
            />
        </>
    );
}

export default AddressInputs;
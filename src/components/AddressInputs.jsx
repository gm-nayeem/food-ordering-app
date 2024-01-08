const AddressInputs = ({
    userInfo, handleChange, disabled = false
}) => {
    const {
        phone, streetAddress, postalCode, city, country
    } = userInfo;

    return (
        <>
            <label>Phone</label>
            <input
                disabled={disabled}
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={phone}
                onChange={handleChange} />
            <label>Street address</label>
            <input
                disabled={disabled}
                type="text"
                name="streetAddress"
                placeholder="Street address"
                value={streetAddress}
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
                        value={postalCode}
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
                        value={city}
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
                value={country}
                onChange={handleChange}
            />
        </>
    );
}

export default AddressInputs;
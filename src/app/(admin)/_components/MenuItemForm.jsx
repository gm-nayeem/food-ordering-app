'use client'

import { useState } from "react";
import EditableImage from "@/components/EditableImage";
import MenuItemPrice from "./MenuItemPrice";
import { useCategories } from "@/hooks/useCategories";

const MenuItemForm = ({ onSubmit, menuItem }) => {
    const { loading, data: categories } = useCategories();

    const [newMenuItem, setNewMenuItem] = useState({
        name: menuItem?.name || '',
        description: menuItem?.description || '',
        basePrice: menuItem?.basePrice || '',
        category: menuItem?.category || ''
    });
    const [image, setImage] = useState(menuItem?.image || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setNewMenuItem(prev => (
            {
                ...prev,
                [name]: value
            }
        ));
    }

    if (loading) {
        return <div className="text-center my-4">Loading...</div>
    }

    const {
        name, description, basePrice, category
    } = newMenuItem;

    return (
        <form
            onSubmit={e => onSubmit(e, {
                ...newMenuItem,
                image, sizes, extraIngredientPrices
            })}
            className="mt-8 max-w-2xl mx-auto"
        >
            <div
                className="md:grid items-start gap-4"
                style={{ gridTemplateColumns: '.3fr .7fr' }}
            >
                <div>
                    <EditableImage link={image} setLink={setImage} />
                </div>
                <div className="grow">
                    <label>Item name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleChange}
                    />
                    <label>Category</label>
                    <select
                        name="category"
                        value={category}
                        onChange={handleChange}
                    >
                        {
                            categories?.length > 0 ? (
                                <>
                                    <option value="" >Choose one</option>
                                    {categories.map(cat => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </>
                            ) : null
                        }
                    </select>
                    <label>Base price</label>
                    <input
                        type="text"
                        name="basePrice"
                        value={basePrice}
                        onChange={handleChange}
                    />
                    <MenuItemPrice
                        name={'Sizes'}
                        addLabel={'Add item size'}
                        props={sizes}
                        setProps={setSizes}
                    />
                    <MenuItemPrice
                        name={'Extra ingredients'}
                        addLabel={'Add ingredients prices'}
                        props={extraIngredientPrices}
                        setProps={setExtraIngredientPrices}
                    />
                    <button type="submit">Save</button>
                </div>
            </div>
        </form>
    );
}

export default MenuItemForm;
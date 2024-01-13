'use client'

import { useState } from "react";
import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";
import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";

const MenuItemPrice = ({ name, addLabel, props, setProps }) => {
    const [isOpen, setIsOpen] = useState(false);

    const addItem = () => {
        setProps(oldProps => {
            return [...oldProps, { name: '', price: 0 }];
        });
    }

    const editItem = (e, index, type) => {
        const newValue = e.target.value;

        setProps(prev => {
            const newArr = [...prev];
            newArr[index][type] = newValue;
            return newArr;
        });
    }

    const removeItem = (indexToRemove) => {
        setProps(prev => prev.filter((v, index) => index !== indexToRemove));
    }

    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="inline-flex p-1 border-0 justify-start"
                type="button"
            >
                {
                    isOpen ? <ChevronUp /> : <ChevronDown />
                }
                <span>{name}</span>
                <span>{props?.length}</span>
            </button>
            <div className={isOpen ? 'block' : 'hidden'}>
                {
                    props?.length > 0 ? (
                        props.map((val, index) => (
                            <div key={index} className="flex items-end gap-2">
                                <div>
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        placeholder="Size name"
                                        value={val.name}
                                        onChange={e => editItem(e, index, 'name')}
                                    />
                                </div>
                                <div>
                                    <label>Extra price</label>
                                    <input
                                        type="text"
                                        placeholder="Extra price"
                                        value={val.price}
                                        onChange={e => editItem(e, index, 'price')}
                                    />
                                </div>
                                <div>
                                    <button type="button"
                                        onClick={() => removeItem(index)}
                                        className="bg-white mb-2 px-2"
                                    >
                                        <Trash />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : null
                }
                <button
                    type="button"
                    onClick={addItem}
                    className="bg-white items-center">
                    <Plus className="w-4 h-4" />
                    <span>{addLabel}</span>
                </button>
            </div>
        </div>
    );
}

export default MenuItemPrice;
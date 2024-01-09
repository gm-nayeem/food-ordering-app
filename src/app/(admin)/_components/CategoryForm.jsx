
const CategoryForm = ({
    handleCategorySubmit, categoryName, setCategoryName,
    editedCategory, setEditedCategory
}) => {
    return (
        <form className="mt-8" onSubmit={handleCategorySubmit}>
            <div className="flex gap-2 items-end">
                <div className="grow">
                    <label>
                        {
                            editedCategory ? (
                                <span>Update category: {editedCategory?.name}</span>
                            ) : (
                                <span>New category name</span>
                            )
                        }
                    </label>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={e => setCategoryName(e.target.value)}
                    />
                </div>
                <div className="pb-2 flex gap-2">
                    <button className="border border-primary" type="submit">
                        {editedCategory ? 'Update' : 'Create'}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setEditedCategory(null);
                            setCategoryName('');
                        }}>
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    )
}

export default CategoryForm;
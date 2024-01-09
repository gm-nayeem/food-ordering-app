import DeleteButton from '@/components/DeleteButton';

const CategoriesComponents = ({
  categories, handleCategoryDelete, setCategoryName, setEditedCategory
}) => {

  return (
    <div>
      <h2 className="mt-8 mb-1 text-sm text-gray-500">Existing categories:</h2>
      {
        categories?.length > 0 ? (
          categories.map(cat => (
            <div
              key={cat?._id}
              className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
              <div className="grow">
                {cat?.name}
              </div>
              <div className="flex gap-1">
                <button type="button"
                  onClick={() => {
                    setEditedCategory(cat);
                    setCategoryName(cat?.name);
                  }}
                >
                  Edit
                </button>
                <DeleteButton
                  label="Delete"
                  onDelete={() => handleCategoryDelete(cat?._id)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-red-500 text-lg font-semibold text-center">Category Not Available!</p>
        )
      }
    </div>
  )
}

export default CategoriesComponents;
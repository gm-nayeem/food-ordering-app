import { Schema, model, models } from 'mongoose';

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Categoryname is required!'],
    }
}, { timestamps: true });

const Category = models?.Category || model("Category", CategorySchema);

export default Category;
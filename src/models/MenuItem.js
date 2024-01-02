import { model, models, Schema } from "mongoose";

const ExtraPriceSchema = new Schema({
    name: String,
    price: Number,
});

const MenuItemSchema = new Schema({
    name: { type: String },
    description: { type: String },
    image: { type: String },
    basePrice: { type: Number },
    sizes: { type: [ExtraPriceSchema] },
    extraIngredientPrices: { type: [ExtraPriceSchema] },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
}, { timestamps: true });

const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);

export default MenuItem;
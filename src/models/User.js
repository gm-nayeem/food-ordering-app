import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
    },
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    password: {
        type: String,
    },
    image: {
        type: String,
    }
}, { timestamps: true });

const User = models?.User || model("User", UserSchema);

export default User;
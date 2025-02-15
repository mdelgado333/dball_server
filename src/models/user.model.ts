import { Schema, model} from 'mongoose';

const UserSchema = new Schema({
    username: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
},  {
    timestamps: true
    }
);

export const User = model('User', UserSchema);
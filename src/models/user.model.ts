import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { userInfo } from '../interfaces/model.interfaces';

const UserSchema: mongoose.Schema<userInfo> = new mongoose.Schema({
    username: { type: String },
    name: { type: String, unique: true },
    password: { type: String },
});

const saltRounds = 8

UserSchema.pre('save', async function (next) {
 const user = this;
 if (user.isModified('password')) {
   user.password = await bcrypt.hash(user.password, saltRounds);
 }
 next();
});

export const User = mongoose.model<userInfo>('User', UserSchema);
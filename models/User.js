import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const { hash, compare } = bcrypt;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await hash(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = function (password) {
    return compare(password, this.password);
};

export default model('User', UserSchema);

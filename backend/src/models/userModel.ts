import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcrypt';

export interface Imissile {
    name: string;
    amount: number;
}

export interface IUser extends Document {
    _id: string;
    username: string;
    password: string;
    organization: "IDF" | "Houthis" | "IRGC" | "Hamas" | "Hezbollah";
    location: "North" | "South" | "Center" | "West Bank" | null;
    resources: [Imissile];
    budget: number;
    comparePassword(userPassword: string): Promise<boolean>;
};

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "UserName is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    organization: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    resources: [
        {
            name: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
        },
    ],
    budget: {
        type: Number,
        required: true,
    },
});

UserSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
    return await bcrypt.compare(userPassword, this.password)
};

UserSchema.index({ username: 1 });

export default mongoose.model<IUser>("users", UserSchema)

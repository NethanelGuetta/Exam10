import mongoose, { Schema, Document } from "mongoose";

export interface IMissileDetails extends Document {
    // _id: string;
    name: string;
    description: string;
    speed: number;
    intercepts: string[];
};

export interface IAttack extends Document {
    _id: string;
    missileName: string;
    location: string;
    missileDetails: object;
    status: "Launched" | "Hit" | "Intercepted";
};

const AttackSchema = new Schema<IAttack>({
    missileName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    missileDetails: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
  
});

AttackSchema.index({ location: 1 });

export default mongoose.model<IAttack>("attacks", AttackSchema);
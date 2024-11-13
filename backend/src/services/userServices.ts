import mongoose, { Types } from "mongoose";
import userModel, { Imissile, IUser } from "../models/userModel";

interface IResources {
    name: string;
    resources: [Imissile];
    budget: number;
}

const resourcesList: [IResources] = require('../data/organization.json')

export const createuser = async (data: Partial<IUser>): Promise<IUser> => {

    const orgName = data.organization === 'IDF' ? data.organization + " - " + data.location : data.organization ?? '';
    const resourceByName = resourcesList.find((r: any) => r.name === orgName);
    const resourcesToAdd = resourceByName?.resources
    const newUser = new userModel({ ...data, resources: resourcesToAdd, budget: resourceByName?.budget });
    await newUser.save();
    return newUser
};
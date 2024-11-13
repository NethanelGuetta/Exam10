import uesrModel from "../models/uesrModel";
import { createuser } from "../services/userServices";

const resourcesList = require('../data/missiles.json')

export const registerUser = async (req: any, res: any) => {
    const { username, password, organization, location } = req.body;

    try {
        const userExist = await uesrModel.findOne({ username });
        if (userExist) {
            res.status(401).json({ message: "User already exist" });
        }
        const newUser = await createuser({ username, password, organization, location });
        res.status(201).json({ message: "User registered successfully" , user: newUser});
        return

    } catch (error) {
        console.log(error);
        
        res.status(400).json("Error registering user");

    }
}
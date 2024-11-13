import { Request, Response } from "express";
import userModel from "../models/userModel";
import { createuser } from "../services/userServices";
import { generateToken } from "../utils/token";

export const registerUser = async (req: Request, res: Response) => {
    const { username, password, organization, location } = req.body;

    try {
        const userExist = await userModel.findOne({ username });
        if (userExist) {
            res.status(401).json({ message: "User already exist" });
            return
        }
        const newUser = await createuser({ username, password, organization, location });
        res.status(201).json({ message: "User registered successfully", user: newUser });
        return

    } catch (error) {
        console.log(error);

        res.status(400).json("Error registering user");

    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: "UserName and password are required" });
        return
    }

    const user = await userModel.findOne({ username });
    if (user) {
        if (!(await user.comparePassword(password))) {
            res.status(401).json({ message: "Invalid email or password" });
        }
        else{

        const token = generateToken(user._id, user.organization, user.location);
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: false,
        //     maxAge: 3600000
        // })
        res.status(200).json({ message: "logged in successfully", user, token });
        return
        }
    }
};
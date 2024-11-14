import { Request, Response } from "express";
import userModel, { IUser } from "../models/userModel";
import attackModel, { IMissileDetails } from "../models/attackModel";
import { checkIfGood, createAttack } from "../services/missileService";
import { log } from "console";

export const getAttacksByLocation = async (req: Request, res: Response) => {
    const location = req.params.location;
    
    try {
        const attacks = await attackModel.find({ location });
        if (attacks.length === 0) {
            res.status(404).json({ message: "No attacks found" });
            return
        }
        res.status(200).json(attacks);
    } catch (error) {
        console.log(error);
        res.status(400).json("Error getting attacks");
    }
}

export const defence = async (req: Request, res: Response) => {
    const attackId = req.params.attackId;
    console.log("attackId: " ,attackId);
    
    const defenceMissileName = req.body.defenceMissileName;
    console.log(defenceMissileName);
    
    const timeLeft = req.body.timeLeft;
    console.log("timeLeft: " ,timeLeft);
    
    const isGood = await checkIfGood(defenceMissileName, attackId, timeLeft);
    if (isGood) {
        res.status(200).json({ message: "Attack intercepted successfully" });
    } else {
        res.status(200).json({ message: "You cant intercept the attack" });
    }

};

export const attack = async (req: Request, res: Response) => {
    const { missileName, location } = req.body;

    try {
        const newAttack = await createAttack({ missileName, location });
        res.status(201).json({ message: "Attack launched successfully", newAttack });
        return
    } catch (error) {
        console.log(error);
        res.status(400).json("Error launching attack");
    }
}
import { Request, Response } from "express";
import userModel, { IUser } from "../models/userModel";
import attackModel, { IMissileDetails } from "../models/attackModel";
import { checkIfGood, createAttack } from "../services/missileService";
import { log } from "console";


export const defence = async (req: Request, res: Response) => {
    const attackId = req.params.attackId;
    const defenceMissileName = req.body.defenceMissileName;
    const timeLeft = req.body.timeLeft;
     const isGood = await checkIfGood(defenceMissileName, attackId, timeLeft);
    if (isGood) {
        res.status(200).json({ message: "Attack intercepted successfully" });
    } else {
        res.status(200).json({ message: "You cant intercept the attack" });
    }
    
};

export const attack = async (req: Request, res: Response) => {
    const{ missileName, location} = req.body;

    try {
        const newAttack = await createAttack({ missileName, location });
        res.status(201).json({ message: "Attack launched successfully", newAttack });
        return
    } catch (error) {
        console.log(error);
        res.status(400).json("Error launching attack");
    }
}
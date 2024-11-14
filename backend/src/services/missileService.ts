import mongoose, { Types } from "mongoose";
import attackModel, { IAttack, IMissileDetails } from "../models/attackModel";



const allMissilesDatailsList: [IMissileDetails] = require('../data/missiles.json')

export const createAttack = async (data: Partial<IAttack>): Promise<any> => {

    const missileName = data.missileName;
    const location = data.location;
    const missileDetailsByName = allMissilesDatailsList.find((m: any) => m.name === missileName);
    // console.log(missileDetailsByName);
    // console.log(missileName);
    // console.log(location);

    const newAttack = new attackModel({ missileName, location, missileDetails: missileDetailsByName, status: "Launched" });
    // console.log(newAttack);

    await newAttack.save();
    return newAttack
};

export const checkIfGood = async (defenceMissileName: string, attackId: string, timeLeft: number) => {
    const attack = await attackModel.findById(attackId).exec();

    const missileDetailsByName = allMissilesDatailsList.find((m: any) => m.name === defenceMissileName);
    const defenceMissileSpeed = missileDetailsByName?.speed || 0; //check if speed is undefined
    // console.log(defenceMissileSpeed);
    
    const attackMissileSpeed = (attack?.missileDetails as IMissileDetails)?.speed ;

    if (attack) {
        if (attack.status !== "Launched") {
            return false;
        }
        if (missileDetailsByName?.intercepts.includes(attack.missileName)) {

            if (defenceMissileSpeed > timeLeft) {
                // attack.status = "Hit";
                // await attack.save();
                return false;
            } else {
                attack.status = "Intercepted";
                await attack.save();
                return true;
            }
        }
        else {
            return false
        }
    }
    else {
        throw new Error(`No attack found with ID ${attackId}`);
    }
}
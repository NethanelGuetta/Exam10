import {Router} from "express";
import { attack, defence, getAttacksByLocation } from "../controllers/attackController";
const router = Router();

router.get('/getByLocation/:location', getAttacksByLocation);
router.post('/attack', attack);
router.post('/defence/:attackId', defence);
export default router
import {Router} from "express";
import { attack, defence } from "../controllers/attackController";
const router = Router();

router.post('/attack', attack);
router.post('/defence/:attackId', defence);
export default router
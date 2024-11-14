import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserType } from "../types/userType";
import { AppDispatch, RootState } from "../store/store";
import { AttackType } from "../types/attackTypes";
import { addAttack, getAttacksByLocation, removeAttack } from "../store/feature/attackSlice";

const QA: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>()

    const attaks: AttackType[] = useSelector((state: RootState) => state.attack.attack);
    // console.log(users);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    // const { error, status } = useSelector((state: RootState) => state.attack);

    const handleRegister = () => {
        // יצירת אובייקט המשתמש


        // שליחת הנתונים לפונקציה האסינכרונית בסלייס
        // dispatch(getAttacksByLocation("Center"));
        
        // dispatch(addAttack({ missileName: "Fateh-110", location: 'Center' }))
        const data = { id: "67351be0c1181546c1dc1840", defenceMissileName: "David's Sling", timeLeft: 1 }
        dispatch(removeAttack(data))
    };


    return (
        <div>
            <button onClick={handleRegister}>get</button>
            <button onClick={handleRegister}>add</button>
            <button onClick={handleRegister}>remove</button>
        </div>
    )
}

export default QA
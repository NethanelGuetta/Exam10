import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "../../store/store";
import { AttackType } from "../../types/attackTypes";
import { addAttack, getAttacksByLocation, removeAttack } from "../../store/feature/attackSlice";
import styles from "./AttackComp.module.css";
import { UserType } from '../../types/userType';
import { io , Socket } from 'socket.io-client';


interface ChatMessage {
    user: string;
    message: any;
    timestamp: Date;
}

const DashboardAttack: React.FC = () => {

//io
    const [socket, setSocket] = useState<Socket | null>(null);
    const [message, setMessage] = useState<string>('hello');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [username, setUsername] = useState<string>('neti');
    
    useEffect(() => {
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);
        
        return () => {
            newSocket.close();
        };
    }, []);

    
  useEffect(() => {
    if (!socket) return;

    socket.on('receive_message', (message: any) => {
        console.log(message);
        
      setMessages((prevMessages) => [...prevMessages, message]);
      setAttacks(message)
      
    });

    return () => {
      socket.off('receive_message');
    };
  }, [socket]);


  const sendAttackMessage = () => {
    
    if (socket) {
        console.log(1111);
        
      const messageData: ChatMessage = {
        user: username,
        message: {selectedTarget, missileChosen},
        timestamp: new Date()
      };

      socket.emit('send_message', messageData);
      console.log(messageData);
      
      setMessage('');
    }
  };

  const sendDefenceMessage = () => {
    
    if (socket) {
        console.log(1111);
        
      const messageData: ChatMessage = {
        user: username,
        message: { id: "123456", defenceMissileName: missileChosen, timeLeft: 1 },
        timestamp: new Date()
      };

      socket.emit('send_defence_message', messageData);
      console.log(messageData);
      
      setMessage('');
    }
  };

    
    //io
    const currentUser: UserType = useSelector((state: RootState) => state.user.user);
 
    const dispatch = useDispatch<AppDispatch>();

    const allAttacks = useSelector((state: RootState) => state.attack.attack);
    const [selectedTarget, setSelectedTarget] = useState<string>('');
    const [missileChosen, setMissileChosen] = useState<string>('');
    const [attacks, setAttacks] = useState<AttackType[]>([]);

    useEffect(() => {
        setSelectedTarget(currentUser.location);

    }, [currentUser]);

    useEffect(() => {
        const fetchAttacks = async () => {
            const attacks = await dispatch(getAttacksByLocation(selectedTarget)).unwrap();
            setAttacks(attacks ?? []);
        };
        fetchAttacks();
    }, [currentUser.location, dispatch, selectedTarget]);

    const handleTargetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTarget(event.target.value);
    };

    // Launch the weapon and log the attack
    const handleLaunch = (weaponName: string) => {
        if (currentUser.organization === "IDF") {
            setMissileChosen(weaponName)
        }
        else {
            if (!selectedTarget) {
                alert('Please select a target before launching.');
                return;
            }
            if (currentUser.organization !== "IDF") {
                setMissileChosen(weaponName);
                const newAttack = {
                    missileName: weaponName,
                    location: selectedTarget,
                };
                // dispatch(addAttack(newAttack));
            }          
        }
    };

    const handleDefence = (attackId: string) => {
        dispatch(removeAttack({ id: attackId, defenceMissileName: missileChosen, timeLeft: 17 }));
    }

    if (!currentUser) {
        return <div>Loading user data...</div>;
    }

    return (

        <div className={styles.dashboardAttack}>

            <h1>Organization: {`${currentUser.organization} - ${currentUser.location}`}</h1>
            {currentUser.organization !== "IDF" &&
                <div className={styles.targetSelector}>
                    <select value={selectedTarget} onChange={handleTargetChange}>
                        <option value="">Choose Target</option>
                        <option value="North">North</option>
                        <option value="Center">Center</option>
                        <option value="South"> South</option>
                        <option value="West Bank"> West Bank</option>
                    </select>
                </div>}

            <div className={styles.navbar}>
                {currentUser.resources.map((weapon: any) => (
                    <button
                        key={weapon.name}
                        onClick={() => handleLaunch(
                            weapon.name,
                        )}
                        disabled={weapon.amount <= 0}
                        className={styles.weaponButton}
                        style={{ backgroundColor: missileChosen === weapon.name ? 'lightblue' : '' }}
                    >
                        {weapon.name} X ({weapon.amount})
                    </button>
                    
                ))}
                <button onClick={currentUser.organization !== "IDF" ? sendDefenceMessage : sendAttackMessage}>Launch</button>
            </div>

            <div className={styles.attackLog}>
                <table className={styles.attackTable}>
                    <thead>
                        <tr>
                            <th>Missile</th>
                            <th>Destination</th>
                            <th>Time Left</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attacks.map((attack: AttackType) => (
                            <tr key={attack._id}>
                                <td>{attack.missileName}</td>
                                <td>{attack.location}</td>

                                <td>
                                    {/* {setInterval(() => {
                                    attack.missileDetails.speed > 0 ? attack.missileDetails.speed-- : clearInterval(attack.missileDetails.speed);
                                }, 1000)} */}
                                </td>

                                <td>{attack.status} {attack.status === "Launched" ? currentUser.organization !== "IDF" ? " " : <button onClick={() => handleDefence(attack._id)}>❌</button> : " "}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardAttack;
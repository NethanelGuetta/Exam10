import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import styles from "./RegisterComp.module.css";
import { UserType } from "../../types/userType";
import { registerUser } from "../../store/feature/authSlice";


const Register: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [organization, setOrganization] = useState('');
    const [location, setLocation] = useState('');

    const { error, status } = useSelector((state: RootState) => state.user);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        const newUser: Partial<UserType> = {
            username: username,
            password: password,
            organization: organization,
            location: location

        };
        dispatch(registerUser(newUser));
    };

    return (
        <div className={styles.registerContainer}>
            <h2>Register</h2>
            {status === 'loading' && <p>Loading...</p>}
            {error && <p className="error-message">Error: {error}</p>}
            <form onSubmit={handleRegister} className={styles.registerForm}>
                <input
                    type="text"
                    placeholder="Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.inputField}
                />
                <br />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.inputField}
                />
                <br />
                <br />
                <select className={styles.select} name="" id="" onChange={(e) => setOrganization(e.target.value)}>
                    <option value="" >Select organization</option>
                    <option value="IDF">IDF</option>
                    <option value="Houthis">Houthis</option>
                    <option value="IRGC">IRGC</option>
                    <option value="Hamas">Hamas</option>
                    <option value="Hezbollah">Hezbollah</option>
                </select>
                <br />
                <br />
                {organization === "IDF" ?
                    <select className={styles.select} name="" id="" onChange={(e) => setLocation(e.target.value)}>
                        
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="Center">Center</option>
                        <option value="West Bank">West Bank</option>
                      </select>
                    : null}

                <br />
                <br />
                        <button type="submit" disabled={status === 'loading'} className={styles.registerButton}>
                            Register
                        </button>
                    </form>
        </div>
    );
};

export default Register;
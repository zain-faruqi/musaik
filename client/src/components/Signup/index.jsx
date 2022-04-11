import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';

const Signup = () => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        email: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setUser({
            ...user,
            [input.name]: input.value,
        });
    }

    const handleSubmit = async (e) => {
                e.preventDefault();
                try {
                    const res = await fetch('/api/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(user),
                    });
                    const data = await res.json();
                    if (data.message === 'User created.') {
                        navigate('/login');
                    } else {
                        setError(data.message);
                    }
                } catch (error) {
                    if (error.response &&
                        error.response.status >= 400 &&
                        error.response.status < 500
                    ) { 
                        setError(error.response.data.message);
                    }
                }
         };
    return (
        <div className={styles.container}>
            <img src={"./musaiclogo.svg"} />
            <div className={styles.signup_container}>
                <div className={styles.top}>
                    <form onSubmit={handleSubmit}>
                        <h2>Create Account</h2>
                        <input
                            type="text"
                            placeholder="username"
                            name="username"
                            onChange={handleChange}
                            value={user.username}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="email"
                            name="email"
                            onChange={handleChange}
                            value={user.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="password"
                            name="password"
                            onChange={handleChange}
                            value={user.password}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type='submit'>Sign up</button>
                    </form>
                </div>
                <div className={styles.bottom}>
                    <Link to="/login">
                        <button type='button' className={styles.login}>log in</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
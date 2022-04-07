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
            const url = 'http://localhost:8080/api/users';
            const { user: res } = await axios.post(url, user);
            navigate('/login');
            console.log(res.message);
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status < 500
            ) {
                setError(error.response.data.message);
            }
        }
    }
    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type='button' className={styles.white_btn}>Sign in</button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.signup_form} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
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
                            type="password"
                            placeholder="password"
                            name="password"
                            onChange={handleChange}
                            value={user.password}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type='submit' className={styles.green_btn}>Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
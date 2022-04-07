import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';

const Login = () => {
    const [user, setUser] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');


    const handleChange = ({ currentTarget: input }) => {
        setUser({
            ...user,
            [input.name]: input.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:8080/api/auth';
            const { user: res } = await axios.post(url, user);
            localStorage.setItem('token', res.token);
            window.location = '/';
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
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                   <form className={styles.login_form} onSubmit={handleSubmit}>
                        <h1>Log in</h1>
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
                            type="password"
                            placeholder="password"
                            name="password"
                            onChange={handleChange}
                            value={user.password}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type='submit' className={styles.green_btn}>Sign in</button>
                    </form>
                </div>
                <div className={styles.right}>
                     <h1>New?</h1>
                    <Link to="/signup">
                        <button type='button' className={styles.white_btn}>Sign up</button>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
}

export default Login;
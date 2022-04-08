import { useState } from 'react';
import { Link} from 'react-router-dom';
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
            localStorage.setItem('user', user['token']);
            console.log(localStorage.getItem('user'));
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
        <div className={styles.container}>
            <img src={"./musaiclogo.svg"} />
            <div className={styles.login_container}>
                <div className={styles.top}>
                   <form onSubmit={handleSubmit}>
                        <h2>Log in</h2>
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
                            type="text"
                            placeholder="password"
                            name="password"
                            onChange={handleChange}
                            value={user.password}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type='submit'>Sign in</button>
                    </form>
                </div>
                <div className={styles.bottom}>
                    <Link to="/signup">
                        <button type='button' className={styles.signup}>Sign up</button>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
}

export default Login;
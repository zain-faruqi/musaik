import styles from './styles.module.css';
import { useState } from 'react';
const Profile = () => {

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
    };

    const [user, setUser] = useState({
        username: '',
        pins: [],
    });
    const [error, setError] = useState('');

    const searchForUser = (e) => {
        e.preventDefault();
        try {
            const user = 'http://localhost:8080/api/search';
            localStorage.setItem('user', JSON.stringify(user));
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
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>musaic</h1>
                <form class={styles.search} onSubmit={searchForUser}>
                    <input
                        type="text"
                        placeholder="Search"
                        class={styles.input}
                        name="username"
                    />
                    <button type ="submit" >Search</button>
                </form>
                <button className={styles.logout} onClick={handleLogout}>
                    logout
                </button>
            </nav>
            <div>
                <h1>{user.username}</h1>
                <h2>{user.pins.length} pins</h2>
            </div>
        </div>
    );
};

export default Profile;
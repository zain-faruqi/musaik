import styles from './styles.module.css';
import { useState } from 'react';
const Profile = () => {

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
    };

    const [user, setUser] = useState({
        username: '',
        pins:[],
    });

    const [searchUser, setSearchUser] = useState({
        username: '',
    });

    const [error, setError] = useState('');

    const handleChange = ({ currentTarget: input }) => {
        setSearchUser({
            username: input.value,
        });
    }
    
    const searchForUser = async (e) => {
                e.preventDefault();
                try {
                    const res = await fetch('/api/search', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(searchUser),
                    });
                    const data = await res.json();
                    console.log(JSON.stringify(data));
                    if (data.username && data.pins) {
                        setUser({
                            username: data.username,
                            pins: data.pins,
                        });
                        console.log("genius");
                    } else {
                        setError(data.message);
                    }
                } catch (error) {
                    if (error.response &&
                        error.response.status >= 400 &&
                        error.response.status < 500
                    ) { 
                        setError(error.response.data.message);
                        console.log(error);
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
                        placeholder="search"
                        name="username"
                        onChange={handleChange}
                        value={searchUser.username}
                        required
                        class={styles.input}
                    />
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <button type='submit'>Search</button>
                </form>
                <button className={styles.logout} onClick={handleLogout}>
                    logout
                </button>
            </nav>
            <div>
                <h2>{user.username}</h2>
                <h3>{user.pins.length} pins</h3>
            </div>
        </div>
    );
};

export default Profile;
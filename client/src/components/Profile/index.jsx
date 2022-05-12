import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import person  from './person.svg';
import globe from './globe.svg';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
const Profile = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        axios.get('/logout', { withCredentials: true }).then(res => {
            navigate('/login');
        })
    };

    const [displayUser, setDisplayUser] = useState({
        username: '',
        followers: '',
        image_url: '',
        country: '',
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
    
    const userHome = () => {
        setDisplayUser({
            username: user.display_name,
            followers: user.followers,
            image_url: user.image_url,
            country: user.country,
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
                    if (data.display_name) {
                        setDisplayUser({
                            username: data.display_name,
                            followers: data.followers,
                            image_url: data.image_url,
                            country: data.country
                        });
                    } else {
                        setError("user not found");
                    }
                } catch (error) {
                    if (error.response &&
                        error.response.status >= 400 &&
                        error.response.status < 500
                    ) { 
                        setError("User not found");
                        console.log(error);
                    }
                }
    };
    
    const [user, setUser] = useState({});
    
    useEffect(() => {
        axios.get('/getuser', { withCredentials: true }).then((res) => {
            setUser(res.data);
        }
        )
    }, []);

    useEffect(() => {
        if (user.display_name) {
            setDisplayUser({
                username: user.display_name,
                followers: user.followers,
                image_url: user.image_url,
                country: user.country,
            });
        }
    }, [user]);

    
    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1 onClick={userHome}>musaik</h1>
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
            
            <div className={styles.profile_container}>
            <h1 className={styles.username}>{displayUser.username}</h1>
                <div className={styles.profile_sub}>
                    <div className={styles.sub_container}>
                        <div className={styles.icon_frame_left}><img src={person} alt="globe"/></div>
                        <div className={styles.text_container}>{displayUser.followers} followers</div>
                    </div>
                <div className={styles.profile_pic}>
                    <img src={displayUser.image_url} alt="profile" />
                </div>
                <div className={styles.sub_container}>
                    <div className={styles.text_container}>{displayUser.country}</div>
                    <div className={styles.icon_frame_right}><img src={globe} alt="globe"/></div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Profile;
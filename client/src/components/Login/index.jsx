import { useState } from 'react';
import spotify from "./spotify.png";
import styles from './styles.module.css';

const Login = () => {
    
    const SpotifyLogin = () => {
        window.open('/auth/spotify', '_self');
    }
    
    return (
        <div className={styles.container}>
            <img src={"./musaiclogo.svg"} />
            <div className={styles.login_container}>
                    <div className={styles.loginForm} >
                        <div className={styles.spotifyContainer} onClick={SpotifyLogin}>
                            <img src={spotify} alt='spotify-logo' className={styles.spotifyLogo} />
                            <h2>Login with Spotify</h2>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Login;
import styles from './styles.module.css';

const Main = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>musaic</h1>
                <button className={styles.white_btn} onClick={handleLogout}>
                    logout
                </button>
            </nav>
        </div>
    );
};

export default Main;
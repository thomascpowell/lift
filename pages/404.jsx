// Next
import Link from "next/link";

// Styles
import styles from "../styles/404.module.css"

// Misc
import Helmet from "../components/helmet.jsx"

const FOF = () => {
    return (
        <>
        <Helmet title="404"/>
        <div className={styles.wrapper}>
            <h1>404</h1>
            <p>Not sure what you were looking for.</p>
        </div>
        </>
    );
}

export default FOF;

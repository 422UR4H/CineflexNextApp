import styles from "@/styles/Footer.module.css";

export default function Footer({ children, src, title }) {
    return (
        <div className={styles.wrapper} data-test="footer">
            <div>
                <img src={src} alt="poster" />
            </div>
            <div>
                <p>{title}</p>
                {children}
            </div>
        </div>
    );
}
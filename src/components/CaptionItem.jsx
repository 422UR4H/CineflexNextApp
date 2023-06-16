import styles from "@/styles/CaptionItem.module.css";

export default function CaptionItem({ status, children }) {
    return (
        <div className={styles.wrapper}>

            <div className={`${styles.captionCircle} ${status === "selected" ?
                styles.selected :
                status === "unavailable" ?
                    styles.unavailable :
                    ""}`}>
            </div>

            {children}

        </div>
    );
}
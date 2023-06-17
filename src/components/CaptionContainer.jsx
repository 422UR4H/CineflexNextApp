import styles from "@/styles/CaptionContainer.module.css";
import CaptionItem from "./CaptionItem";

export default function CaptionContainer() {
    return (
        <div className={styles.wrapper}>
            <CaptionItem status="selected">Selecionado</CaptionItem>
            <CaptionItem status="">Disponível</CaptionItem>
            <CaptionItem status="unavailable">Indisponível</CaptionItem>
        </div>
    );
}


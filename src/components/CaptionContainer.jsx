import styles from "@/styles/CaptionContainer.module.css";
import CaptionItem from "./CaptionItem";

export default function CaptionContainer() {
    console.log(styles.selected);

    return (
        <div className={styles.wrapper}>
            <CaptionItem status="selected">Selecionado</CaptionItem>
            <CaptionItem status="">Disponível</CaptionItem>
            <CaptionItem status="unavailable">Indisponível</CaptionItem>
        </div>
        // <div className={styles.wrapper}>
        //     <CaptionItem>
        //         <CaptionCircle
        //             backgroundColor={BACKGROUND_COLOR_SELECTED}
        //             borderColor={BORDER_COLOR_SELECTED}
        //         />
        //         Selecionado
        //     </CaptionItem>
        //     <CaptionItem>
        //         <CaptionCircle
        //             backgroundColor={BACKGROUND_COLOR_AVAILABLE}
        //             borderColor={BORDER_COLOR_AVAILABLE}
        //         />
        //         Disponível
        //     </CaptionItem>
        //     <CaptionItem>
        //         <CaptionCircle
        //             backgroundColor={BACKGROUND_COLOR_UNAVAILABLE}
        //             borderColor={BORDER_COLOR_UNAVAILABLE}
        //         />
        //         Indisponível
        //     </CaptionItem>
        // </div>
    );
}


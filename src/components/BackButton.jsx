// import { useLocation } from "react-router-dom";
import arrow from "@/images/arrow-back-sharp.svg";
import { useRouter } from "next/router";
import styles from "@/styles/BackButton.module.css";
import Image from "next/image";
// import { ArrowBackSharp } from "react-ionicons";


export default function BackButton() {
    // const navigate = useNavigate();
    const router = useRouter();

    // const location = useLocation();
    // const isHomePage = location.pathname === "/";
    const isHomePage = router.pathname === "/";

    return (
        // <button onClick={() => navigate(-1)}
        <button onClick={() => router.back()}
            className={isHomePage ? styles.transparent : ""}
            disabled={isHomePage}
            data-test="go-home-header-btn"
        >
            <Image src={arrow} alt="<-" />
            {/* <ArrowBackSharp
                color={'#00000'}
                height="250px"
                width="250px"
            /> */}
        </button>
    );
}
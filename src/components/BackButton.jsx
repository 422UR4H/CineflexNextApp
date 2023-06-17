// import { useLocation } from "react-router-dom"; --> VITE VERSION
// import { useRouter } from "next/router"; --> OBSOLETE NEXT VERSION
import { usePathname, useRouter } from "next/navigation";
import styles from "@/styles/BackButton.module.css";

// import { BiArrowBack } from "react-icons/bi";
import Image from "next/image";
import arrow from "@/images/arrow-back-sharp.svg";


export default function BackButton() {
    // const navigate = useNavigate(); --> VITE VERSION
    const router = useRouter();

    // const location = useLocation(); --> VITE VERSION
    // const isHomePage = location.pathname === "/"; --> VITE VERSION
    // const isHomePage = router.pathname === "/"; --> OBSOLETE NEXT VERSION 
    const isHomePage = usePathname() === "/";

    return (
        // <button onClick={() => navigate(-1)} --> VITE VERSION
        <button onClick={() => router.back()}
            className={isHomePage ? styles.transparent : ""}
            disabled={isHomePage}
            data-test="go-home-header-btn"
        >
            {/* <BiArrowBack /> */}
            <Image src={arrow} alt="<-" />
        </button>
    );
}
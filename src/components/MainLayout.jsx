import BackButton from "./BackButton";

export default function MainLayout({ children }) {
    return (
        <>
            <header>
                <BackButton />
                CINEFLEX
            </header>

            { children }
        </>
    );
}
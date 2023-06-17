import styles from "@/styles/sucesso.module.css";
import { useRouter } from "next/navigation";

export default function sucesso({ booking }) {
    const router = useRouter();

    if (!booking) {
        return <>Carregando...</>
    }

    return (
        <div className={styles.wrapper}>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <div className={styles.textContainer} data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{booking.movie.title}</p>
                <p>{booking.movie.date} - {booking.movie.time}</p>
            </div>

            <div className={styles.textContainer} data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {booking.seats.map((s) => <p key={s}>Assento {s}</p>)}
            </div>

            <div className={styles.textContainer} data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {booking.client.name}</p>
                <p>CPF: {booking.client.cpf}</p>
            </div>

            <button onClick={() => router.push('/')} data-test="go-home-btn">
                Voltar para Home
            </button>
        </div>
    );
}
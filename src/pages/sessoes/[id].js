import axios from "axios";
import styles from "@/styles/sessoes.module.css";
import { URL_MOVIES } from "@/scripts/constants";
import Footer from "@/components/Footer";
import Link from "next/link";


export default function sessoes({ days, movie }) {
    if (!days) {
        return <>Carregando...</>
    }

    return (
        <div className={styles.wrapper}>
            Selecione o horário
            <div>
                {days.map((d, i) => (
                    <div className={styles.session} key={i} data-test="movie-day">
                        {d.weekday} - {d.date}
                        <div className={styles.buttonsContainer}>
                            {d.showtimes.map((s) => (
                                <Link key={s.id} href={`/assentos/${s.id}`}>
                                    <button data-test="showtime">{s.name}</button>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <Footer>
                <div>
                    <img src={movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{movie.title}</p>
                </div>
            </Footer>
        </div>
    );
}

export const getServerSideProps = async ({ query }) => {
    const { id } = query;
    const { data } = await axios.get(`${URL_MOVIES}/${id}/showtimes`);

    return {
        props: {
            days: data.days,
            movie: { title: data.title, posterURL: data.posterURL }
        }
    };
}
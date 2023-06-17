import axios from "axios";
import styles from "@/styles/sessoes.module.css";
import { URL_MOVIES } from "@/scripts/constants";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function sessoes({ days, movie }) {
    const router = useRouter();

    function link(id) {
        router.push(`/assentos/${id}`);
    }

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
                                <button key={s.id} onClick={() => link(s.id)} data-test="showtime">
                                    {s.name}
                                </button>
                            ))}

                        </div>
                    </div>
                ))}
            </div>

            <Footer src={movie.posterURL} title={movie.title} />
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
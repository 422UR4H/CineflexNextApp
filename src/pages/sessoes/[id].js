import axios from "axios";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useRouter } from "next/router";
import Link from "next/link";
import { URL_MOVIES } from "@/scripts/constants";
import styles from "@/styles/sessoes.module.css";
import Footer from "@/components/Footer";


export default function sessoes() {
    // const { id } = useParams();
    const router = useRouter();
    const { id } = router.query;

    const [days, setDays] = useState(undefined);
    const [movie, setMovie] = useState(undefined);


    useEffect(() => {
        const promise = axios.get(`${URL_MOVIES}/${id}/showtimes`);

        promise.then(({ data }) => {
            setDays(data.days);
            setMovie({ title: data.title, posterURL: data.posterURL });
        });
        promise.catch((error) => console.log(error.response.data));
    }, []);

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
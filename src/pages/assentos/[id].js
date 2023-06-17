import axios from "axios";
import styles from "@/styles/assentos.module.css";
import { useState } from "react";
import URL from "@/scripts/constants";
import CaptionContainer from "@/components/CaptionContainer";
import Footer from "@/components/Footer";
import Form from "@/components/Form";
import SeatsContainer from "@/components/SeatsContainer";


export default function assentos({ setBooking, _seats, footer, movie }) {
    const [seats, setSeats] = useState(_seats);

    if (!seats) {
        return <>Carregando...</>;
    }

    return (
        <div className={styles.wrapper}>
            Selecione o(s) assento(s)
            <SeatsContainer seats={seats} setSeats={setSeats} />
            <CaptionContainer seats={seats} setSeats={setSeats} />
            <Form seats={seats} movie={movie} setBooking={setBooking} />

            <Footer src={footer.posterURL} title={footer.title}>
                <p>{footer.weekday} - {footer.time}</p>
            </Footer>
        </div>
    );
}


export const getServerSideProps = async ({ query }) => {
    const { id } = query;
    const { data } = await axios.get(`${URL.SHOWTIMES}/${id}/seats`);
    const selected = [];

    data.seats.forEach((s) => {
        selected.push({ ...s, isSelected: false });
    });

    return {
        props: {
            _seats: selected,
            footer: {
                posterURL: data.movie.posterURL,
                title: data.movie.title,
                weekday: data.day.weekday,
                time: data.name
            },
            movie: {
                title: data.movie.title,
                date: data.day.date,
                time: data.name
            }
        }
    };
}
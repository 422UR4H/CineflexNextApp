import axios from "axios";
import styles from "@/styles/assentos.module.css";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { URL_SEATS, URL_SHOWTIMES } from "@/scripts/constants";
import CaptionContainer from "@/components/CaptionContainer";
import Footer from "@/components/Footer";


export default function assentos({ setBooking }) {
    // const navigate = useNavigate();
    // const { id } = useParams();
    const router = useRouter();
    const { id } = router.query;

    const [seats, setSeats] = useState(undefined);
    const [footer, setFooter] = useState(undefined);
    const [movie, setMovie] = useState({});
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");


    useEffect(() => {
        const promise = axios.get(`${URL_SHOWTIMES}/${id}/seats`);

        promise.then(({ data }) => {
            const selected = [];

            data.seats.forEach((s) => {
                selected.push({ ...s, isSelected: false });
            });
            setSeats(selected);
            setFooter({
                posterURL: data.movie.posterURL,
                title: data.movie.title,
                weekday: data.day.weekday,
                time: data.name
            });

            setMovie({
                title: data.movie.title,
                date: data.day.date,
                time: data.name
            });
        });
        promise.catch((error) => console.log(error.response.data));
    }, []);

    function select(seat, i) {
        if (!seat.isAvailable) {
            alert("Esse assento não está disponível");
            return;
        }
        const temp = [...seats];

        temp[i].isSelected = !seat.isSelected;
        setSeats(temp);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const idsSelected = [];
        const seatsSelected = [];
        seats.forEach((s) => {
            if (s.isSelected) {
                idsSelected.push(s.id);
                seatsSelected.push(s.name);
            }
        });

        if (idsSelected.length === 0) {
            alert("Selecione pelo menos 1 assento!");
            return;
        }

        axios.post(URL_SEATS, {
            ids: idsSelected,
            name: name,
            cpf: cpf
        });
        setBooking({
            movie,
            seats: seatsSelected,
            client: { name, cpf }
        });

        // navigate(`/sucesso`);
        router.push("/sucesso");
    }

    if (!seats) {
        return <>Carregando...</>;
    }

    seats.map((s) => console.log(s.isAvailable));

    return (
        <div className={styles.wrapper}>
            Selecione o(s) assento(s)

            <div className={styles.seatsContainer}>
                {seats.map((s, i) => (
                    <div key={s.id} className={`
                            ${styles.seatItem}
                            ${s.isSelected && styles.selected}
                            ${!s.isAvailable && styles.disabled}
                        `}
                    >
                        <span onClick={(() => select(s, i))} data-test="seat">
                            {s.name}
                        </span>
                    </div>
                ))}
            </div>

            <CaptionContainer />

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nome do Comprador:</label>
                <input id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Digite seu nome..."
                    required
                    data-test="client-name"
                />

                <label htmlFor="cpf">CPF do Comprador:</label>
                <input id="cpf"
                    type="number"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="Digite seu CPF..."
                    required
                    data-test="client-cpf"
                />

                <button type="submit" data-test="book-seat-btn">
                    Reservar Assento(s)
                </button>
            </form>

            <Footer>
                <div>
                    <img src={footer.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{footer.title}</p>
                    <p>{footer.weekday} - {footer.time}</p>
                </div>
            </Footer>

        </div>
    );
}
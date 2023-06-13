import axios from "axios";
import styled from "styled-components";
// import { useParams } from "react-router-dom";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { URL_SEATS, URL_SHOWTIMES } from "../../scripts/constants";
import {
    BACKGROUND_COLOR_SELECTED,
    BACKGROUND_COLOR_AVAILABLE,
    BACKGROUND_COLOR_UNAVAILABLE,
    BORDER_COLOR_SELECTED,
    BORDER_COLOR_AVAILABLE,
    BORDER_COLOR_UNAVAILABLE
} from "../../scripts/constants";
import { useNavigate } from "react-router-dom";


export default function assentos({ setBooking }) {
    // const { id } = useParams();
    const route = useRouter();
    const { id } = route.query;
    
    const navigate = useNavigate();
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

        navigate(`/sucesso`);
    }

    if (!seats) {
        return <>Carregando...</>;
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.map((s, i) => (
                    <SeatItem disabled={!s.isAvailable} isSelected={s.isSelected} key={s.id}>
                        <span disabled={!s.isAvailable} onClick={(() => select(s, i))} data-test="seat">
                            {s.name}
                        </span>
                    </SeatItem>
                ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle
                        backgroundColor={BACKGROUND_COLOR_SELECTED}
                        borderColor={BORDER_COLOR_SELECTED}
                    />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle
                        backgroundColor={BACKGROUND_COLOR_AVAILABLE}
                        borderColor={BORDER_COLOR_AVAILABLE}
                    />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle
                        backgroundColor={BACKGROUND_COLOR_UNAVAILABLE}
                        borderColor={BORDER_COLOR_UNAVAILABLE}
                    />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={handleSubmit}>
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

                <button type="submit" data-test="book-seat-btn">Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={footer.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{footer.title}</p>
                    <p>{footer.weekday} - {footer.time}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`;

const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`;

const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`;

const CaptionCircle = styled.div`
    border: 1px solid ${({ borderColor }) => borderColor};
    background-color: ${({ backgroundColor }) => backgroundColor};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`;

const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`;

const SeatItem = styled.div`
    border: 1px solid ${({ disabled, isSelected }) => disabled ?
        BORDER_COLOR_UNAVAILABLE :
        isSelected ?
            BORDER_COLOR_SELECTED :
            BORDER_COLOR_AVAILABLE
    };
    background-color: ${({ disabled, isSelected }) => disabled ?
        BACKGROUND_COLOR_UNAVAILABLE :
        isSelected ?
            BACKGROUND_COLOR_SELECTED :
            BACKGROUND_COLOR_AVAILABLE
    };
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;

    &:disabled {
        border: #F7C52B;
        background-color: #FBE192;
    }
`;

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-right: 12px;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`;
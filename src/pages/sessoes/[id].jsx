import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useRouter } from "next/router";
import { Link } from "next/link";
import { URL_MOVIES } from "../../scripts/constants";


export default function sessoes() {
    // const { id } = useParams();
    const route = useRouter();
    const { id } = route.query;
    
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
        <PageContainer>
            Selecione o horário
            <div>
                {days.map((d, i) => (
                    <SessionContainer key={i} data-test="movie-day">
                        {d.weekday} - {d.date}
                        <ButtonsContainer>
                            {d.showtimes.map((s) => (
                                <Link key={s.id} href={`/assentos/${s.id}`}>
                                    <button data-test="showtime">{s.name}</button>
                                </Link>
                            ))}
                        </ButtonsContainer>
                    </SessionContainer>
                ))}
            </div>

            <FooterContainer data-test="footer">
                <div>
                    <img src={movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{movie.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`;

const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`;

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
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
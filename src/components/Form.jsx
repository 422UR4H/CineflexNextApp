// import { useParams } from "react-router-dom"; --> VITE VERSION
// import { useNavigate } from "react-router-dom"; --> VITE VERSION
// import { useRouter } from "next/router"; --> NEXT OBSOLETE VERSION
import { useRouter } from "next/navigation";

import URL from "@/scripts/constants";
import { useState } from "react";
import axios from "axios";


export default function Form({ seats, movie, setBooking }) {
    // const navigate = useNavigate(); --> VITE VERSION
    const router = useRouter();

    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    

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

        axios
            .post(URL.SEATS, {
                ids: idsSelected,
                name: name,
                cpf: cpf
            })
            .then(() => {
                setBooking({
                    movie,
                    seats: seatsSelected,
                    client: { name, cpf }
                });
                // navigate(`/sucesso`); --> VITE VERSION
                router.push("/sucesso");
            })
            .catch((error) => {
                console.error(error);
                alert("Não foi possível prosseguir com a compra. " +
                    "Tente outros assentos, ou tente novamente mais tarde!"
                );
                // reloading the current route making a new request to the server
                router.refresh(); // next router
            })
    }

    return (
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
    );
}
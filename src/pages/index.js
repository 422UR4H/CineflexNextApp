import axios from "axios";
import styles from "@/styles/home.module.css";
import { URL_MOVIES } from "@/scripts/constants";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";


export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const promise = axios.get(URL_MOVIES);

    promise.then(({ data }) => setMovies(data));
    promise.catch((error) => console.log(error.response.data));
  }, []);

  if (movies === undefined || movies.length === 0) {
    return <h1>...</h1>
  }

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Cineflex Next App</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
      </Head>

      <main className={styles.wrapper}>
        Selecione o filme

        <div className={styles.container}>
          {movies.map((m) =>
            <Link key={m.id} href={`/sessoes/${m.id}`}>
              <div className={styles.movie} data-test="movie">
                <img src={m.posterURL} alt={m.title} />
              </div>
            </Link>
          )}

          {/* another syntax to href */}
          {/* {movies.map((m) =>
            <Link key={m.id} href={{ pathname: `/sessoes/[id]`, query: { id: m.id } }}>
              <div className={styles.movie} data-test="movie">
                <img src={m.posterURL} alt={m.title} />
              </div>
            </Link>
          )} */}
        </div>
      </main>
    </>
  );
}
import axios from "axios";
import styles from "@/styles/home.module.css";
import { URL_MOVIES } from "@/scripts/constants";
import Link from "next/link";
import Head from "next/head";


export default function Home({ movies }) {
  // the axios request don't be used because this page is SSR now
  // then, useEffect and useState was removed

  if (movies === undefined || movies.length === 0) {
    return <h1>...</h1>
  }

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Cineflex Next App</title>
      </Head>

      <main className={styles.wrapper}>
        Selecione o filme

        <div className={styles.container}>
          {movies.map((m) => (
            <Link key={m.id} href={`/sessoes/${m.id}`}>
              <div className={styles.movie} data-test="movie">
                <img src={m.posterURL} alt={m.title} />
              </div>
            </Link>
          ))}

          {/* another syntax to href
          <Link key={m.id} href={{ pathname: `/sessoes/[id]`, query: { id: m.id } }}> */}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const {data} = await axios.get(URL_MOVIES);

  return {
    props: { movies: data }
  };
}
import Head from 'next/head';
import store from "../store";
import api from "../server/config";
import '../styles/globals.scss';
import {useEffect} from "react";
import Layout from "../components/Layout";
import {AppProps} from 'next/app';
import {IPlayer} from "../types/types";

function MyApp({Component, pageProps}: AppProps) {

    useEffect(() => {
        api.queryPlayers()
            .then((players: IPlayer[]) => store.setPlayers(players));
    }, []);
    return (
        <Layout>
            <Head>
                <title>Football Manager</title>
            </Head>
            <main>
                <Component {...pageProps} />
            </main>
        </Layout>
    );
}

export default MyApp;

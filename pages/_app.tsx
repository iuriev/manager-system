import Head from 'next/head';
import store from "../store";
import api from "../server/config";
import '../styles/globals.scss';
import {useEffect} from "react";
import Layout from "../components/Layout";
import { AppProps } from 'next/app';

function MyApp({Component, pageProps} : AppProps) {

    useEffect(() => {
        console.info("app did mount");

        const players = api.queryPlayers();
        store.setPlayers(players);
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

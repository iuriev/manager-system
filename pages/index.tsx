import {observer} from "mobx-react-lite"
import Link from 'next/link'
import api from "../server/config"
import store from "../store"
import {useEffect} from 'react'
import Head from "next/head";
import Heading from "../components/Heading";
import styles from "../styles/Players.module.scss";
import {Button} from "@mui/material";

const Home = () => {
    useEffect(() => {
        const players = api.queryPlayers();
        store.setPlayers(players);
    }, []);

    return (
        <>
            <Head>
                <title>Players</title>
            </Head>
            <Heading text="Players list:" tag={'h3'}/>
            <div className={styles.wrapper}>
                {
                    store.players.map(({id, firstName, lastName}, index) => (
                        <Link
                            key={id}
                            href={"/playerdetails?id=" + id}>
                            <a>{`${index+1} ${firstName} ${lastName}`}</a>
                        </Link>
                    ))
                }
            </div>
            <Link href="/playeredit" passHref>
                <Button
                    size={"large"}
                    variant="outlined">Add a new player</Button>
            </Link>
        </>
    )
};

export default observer(Home);

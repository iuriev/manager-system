import Head from 'next/head'
import Router, {useRouter} from 'next/router'
import {useEffect} from 'react'
import styles from "../styles/Players.module.scss";
import api from "../server/config"
import store from "../store";
import {observer} from "mobx-react-lite";
import {Button, Stack} from "@mui/material";

const PlayerEditView = () => {
    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        if (id) {
            store.resetPlayer();
            const player = api.getPlayer(id);

            if (player) {
                store.setPlayer(player)
            }
        }
    }, [id]);

    const onSubmit = (e) => {
        e.preventDefault();
        api.savePlayer(store.player)
        store.updatePlayer(store.player);
        Router.push('/');
    }

    const onInputChange = (e) => {
        const {name, value} = e.target;
        store.player[name] = value;
    }

    const onBack = () => {
        Router.back();
    }

    const title = id
        ? 'Edit player'
        : 'Add a new player';

    return (<>
        <Head>
            <title>{title}</title>
        </Head>

        <h2>{title}</h2>

        <form onSubmit={onSubmit}>
            <div className={styles.playerBlock}>
                <div className={styles.playerInfoBlock}>
                    <div className={styles.playerInfoRow}>
                        <div className={styles.rowTitle}>Last name:</div>
                        <input className={styles.rowDataTitle} type="text" name="lastName" value={store.player.lastName}
                               onChange={onInputChange} autoFocus autoComplete="off"/>
                    </div>
                    <div className={styles.playerInfoRow}>
                        <div className={styles.rowTitle}>First name:</div>
                        <input className={styles.rowDataTitle} type="text" name="firstName"
                               value={store.player.firstName}
                               onChange={onInputChange} autoFocus autoComplete="off"/>
                    </div>
                    <div className={styles.playerInfoRow}>
                        <div className={styles.rowTitle}>Age:</div>
                        <input className={styles.rowDataTitle} type="number" name="age" value={store.player.age}
                               onChange={onInputChange} autoFocus autoComplete="off"/>
                    </div>
                    <div className={styles.playerInfoRow}>
                        <div className={styles.rowTitle}>Position:</div>
                        <input className={styles.rowDataTitle} type="text" name="position"
                               value={store.player.position}
                               onChange={onInputChange} autoFocus autoComplete="off"/>
                    </div>
                    <div className={styles.playerInfoRow}>
                        <div className={styles.rowTitle}>Skills:</div>
                        <div className={styles.rowDataTitle}>
                            {/*<ul>{player.skills.map(item => <li key={item}>{item}</li>)}</ul>*/}
                        </div>
                    </div>
                </div>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="secondary" onClick={onBack}>Back</Button>
                    <Button type="submit" variant="contained" color="success">
                        Save
                    </Button>
                </Stack>
            </div>
        </form>
    </>)
};

export default observer(PlayerEditView);



import Link from 'next/link';
import Head from 'next/head';
import Router, {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import api from "../../server/config";
import store from "../../store";
import styles from "../../styles/Players.module.scss";
import {Button, Stack} from "@mui/material";
import {observer} from "mobx-react-lite";
import {IPlayer} from "../../types/types";

const Player = () => {
    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        const player: IPlayer = api.getPlayer(id as string);

        if (player) {
            store.setPlayer(player);
        }
    }, [id]);

    const onDelete = () => {
        if (!confirm("Delete this player?"))
            return;

        api.deletePlayer(id as string);
        store.resetPlayer();
        Router.push('/');
    };

    const onBack = () => {
        store.resetPlayer();
        Router.back();
    };

    return (
        <>
            <Head>
                <title>{store.player.lastName}</title>
            </Head>
            <div className={styles.playerBlockColumn}>
                <Stack direction="row" spacing={2}>
                <div className={styles.playerInfoBlock}>
                    <div className={styles.playerInfoRow}>
                        <div className={styles.rowTitle}>Last name:</div>
                        <div className={styles.rowDataTitle}>
                            {store.player.lastName}
                        </div>
                    </div>
                    <div className={styles.playerInfoRow}>
                        <div className={styles.rowTitle}>First name:</div>
                        <div className={styles.rowDataTitle}>
                            {store.player.firstName}
                        </div>
                    </div>
                    <div className={styles.playerInfoRow}>
                        <div className={styles.rowTitle}>Age:</div>
                        <div className={styles.rowDataTitle}>
                            {store.player.age}
                        </div>
                    </div>
                    <div className={styles.playerInfoRow}>
                        <div className={styles.rowTitle}>Position:</div>
                        <div className={styles.rowDataTitle}>
                            {store.player.position}
                        </div>
                    </div>
                </div>
                    <img alt="preview" className={styles.imgPreview} id="avatar" src={store.player.imageUrl}/>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="secondary" onClick={onBack}>Back</Button>
                    <Link href={"/player/edit?id=" + id} passHref>
                        <Button variant="contained" color="success">
                            Edit
                        </Button>
                    </Link>
                    <Button type="submit" onClick={onDelete} variant="contained" color="error">
                        Delete
                    </Button>
                </Stack>
            </div>
        </>
    );
};

export default observer(Player);

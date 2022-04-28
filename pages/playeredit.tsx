import Head from 'next/head'
import Router, {useRouter} from 'next/router'
import {useEffect} from 'react'
import styles from "../styles/Players.module.scss";
import api from "../server/config"
import store from "../store";
import {observer} from "mobx-react-lite";
import {Button, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import { POSITION } from '../types/types';

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

    const onSubmit = async (e) => {
        e.preventDefault();
        await api.savePlayer(store.player)
        await store.updatePlayer(store.player);
        await Router.push('/');
        await store.resetPlayer();

    }

    const onInputChange = (e) => {
        const {name, value} = e.target;
        store.player[name] = value;
    }

    const onBack = () => {
        Router.back();
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const uploadImage = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        store.player.imageUrl = base64.toString();
    };


    const title = id
        ? 'Edit player'
        : 'Add a new player';

    return (<>
        <Head>
            <title>{title}</title>
        </Head>
        <form onSubmit={onSubmit}>
            <div className={styles.playerBlock}>
                <div className={styles.playerInfoBlock}>
                    <div>
                        <h2>Edit information</h2>
                    </div>
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
                        <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
                            <InputLabel id="demo-select-small">Position</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={store.player.position}
                                label="Position"
                                onChange={(event) => store.player.position = event.target.value}>
                                {
                                    Object.keys(POSITION).map(key => {
                                        return <MenuItem value={key} key={key}>{key}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className={styles.playerInfoBlock}>
                    <div style={{margin: '24px'}}>
                        <h2>Upload Image</h2>
                    </div>
                    <div style={{ padding: '16px'}}>
                        <input
                            className="form-control form-control-lg"
                            id="selectAvatar"
                            type="file"
                            onChange={uploadImage}
                        />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h6>Image Preview:</h6>
                                <img className={styles.imgPreview} id="avatar" src={store.player.imageUrl}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Stack direction="row" spacing={2} justifyContent={'center'}>
                <Button variant="contained" color="secondary" onClick={onBack}>Back</Button>
                <Button type="submit" variant="contained" color="success">
                    Save
                </Button>
            </Stack>
        </form>
    </>)
};

export default observer(PlayerEditView);



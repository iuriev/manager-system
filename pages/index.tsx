import {observer} from "mobx-react-lite";
import Link from 'next/link';
import store from "../store";
import React, {useEffect, useState} from 'react';
import Head from "next/head";
import Heading from "../components/Heading";
import styles from "../styles/Players.module.scss";
import {Button, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import api from "../server/config";
import {IPlayer} from "../types/types";

const Home = (): JSX.Element => {
    const [group, setGroup] = useState(store.groups[0]);
    const [filterName, setFilterName] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroup('ALL');
        setFilterName(event.target.value);
        store.filteredPlayers = store.players.filter((item) => {
            return item.firstName.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
                || item.lastName.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase());
        });
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        setGroup(event.target.value);
        setFilterName('');
    };

    useEffect(() => {
        api.queryPlayers()
            .then((players: IPlayer[]) => {
                if (players) {
                    store.setPlayers(players);
                }
            });
    }, []);

    useEffect(() => {
            if (group === 'ALL') {
                store.filteredPlayers = store.players;
            } else {
                store.filteredPlayers = store.players.filter((item) => {
                    return item.group === group;
                });
            }

            setGroup(group);
        },
        [group, store.players]);

    return (
        <>
            <Head>
                <title>Players</title>
            </Head>
            <Heading text="Players list:" tag={'h3'}/>
            <div className={styles.playersWrapper}>
                <div className={styles.playersHeader}>
                    <div>
                        <InputLabel id="demo-select-small">Filter by year</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={group}
                            label="Position"
                            onChange={handleSelectChange}>
                            {
                                Object.keys(store.groups).map(key => {
                                    return <MenuItem value={store.groups[key]} key={key}>{store.groups[key]}</MenuItem>;
                                })
                            }
                        </Select>
                    </div>
                    <TextField
                        id="outlined-input"
                        label="Search by name or surname"
                        type="text"
                        style={{width: 250}}
                        value={filterName}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className={styles.wrapper}>
                    {
                        store.filteredPlayers.map(({id, firstName, lastName}, index) => (
                            <Link
                                key={id}
                                href={"/player/details?id=" + id}>
                                <a>{`${index + 1} ${firstName} ${lastName}`}</a>
                            </Link>
                        ))
                    }
                </div>
            </div>
            <Link href="/player/edit" passHref>
                <Button
                    size={"large"}
                    variant="outlined">Add a new player</Button>
            </Link>
        </>
    );
};

export default observer(Home);

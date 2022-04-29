import Head from "next/head";
import Heading from "../../components/Heading";
import Image from "next/image";
import styles from '../../styles/Players.module.scss';
import {GetStaticPaths} from "next";
import {ITeam} from "../../types/types";
import { teams } from '../../static/teams';


export const getStaticPaths : GetStaticPaths = async () => {
  //  const response = await fetch(`${process.env.API_HOST}/teamsdata`);
  //  const data : ITeam [] = await response.json();
    const paths = teams.map(({ id }) => ({
        params: { alias: id }
    }));

    return {
        paths,
        fallback: false,
    };
};

interface getStaticPropsContext {
    params: {
        alias: string,
    }
}

export const getStaticProps = async (context : getStaticPropsContext ) => {
    const { alias } = context.params;

    if (!alias) {
        return {
            notFound: true,
        };
    }

   // const response = await fetch(`${process.env.API_HOST}/teamsdata`);
    //const data : ITeam [] = await response.json();

    const data = teams;

    if (!data) {
        return {
            notFound: true,
        };
    }

    const team : ITeam | undefined = data.find(item => item.id === alias);

    if (!team) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            team
        },
        revalidate: 60,
    };
};

interface teamProps {
    team: ITeam
}

const Team = ({ team } : teamProps) => {
    return (
        <>
            <Head>
                <title>{team.id}</title>
            </Head>
            <Heading text="team details:"/>
            <div className={styles.playerBlock}>
                <div className={styles.playerInfoBlock}>
                    <div className={styles.playerInfoRow}>
                        <div className={styles.rowTitle}>Name: </div>
                        <div className={styles.rowDataTitle}>{team.name}</div>
                    </div>
                    <div className={styles.playerInfoRow}>
                        <div className={styles.rowTitle}>Position: </div>
                        <div className={styles.rowDataTitle}>{team.position}</div>
                    </div>
                    <div className={styles.playerInfoRow}>
                        <div className={styles.rowTitle}>Foundation: </div>
                        <div className={styles.rowDataTitle}>{team.foundation}</div>
                    </div>
                    <div className={styles.playerInfoRow}>
                        <div className={styles.rowTitle}>Players: </div>
                        <div className={styles.rowDataTitle}>
                            <ul>{team.players.map( item =>
                                <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.playerImage}>
                    <Image
                        alt="logo"
                        src={team.imageUrl}
                        width={250}
                        height={250}
                    />
                </div>

            </div>
        </>);
};

export default Team;

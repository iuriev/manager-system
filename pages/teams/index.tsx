import Head from "next/head";
import Heading from "../../components/Heading";
import Link from "next/link";
import styles from '../../styles/Players.module.scss';
import {ITeam} from "../../types/types";
import {teams} from "../../static/teams";

export const getServerSideProps = async () => {
  //   const response = await fetch(`${process.env.API_HOST}/teamsdata`);
  //  const data : ITeam[]= await response.json();
    const data  = teams;

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            teams: data
        },
    };
};

const Teams = ({ teams } : { teams : ITeam[] }) => {
    return (
        <>
            <Head>
                <title>Teams</title>
            </Head>
            <Heading text="Players list:" tag={'h3'}/>
            <div className={styles.wrapper}>
                {
                    teams.map(({id, name, foundation }) => (
                        <Link key={id} href={`/teams/${id}`}>
                            <a>{`${id} ${name} ${foundation}`}</a>
                        </Link>
                    ))
                }
            </div>
        </>);
};

export default Teams;

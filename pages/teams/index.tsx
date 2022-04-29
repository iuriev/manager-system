import {observer} from "mobx-react-lite";
import Head from "next/head";
import Heading from "../../components/Heading";

const Teams = () => {
    return (
        <>
            <Head>
                <title>Index</title>
            </Head>
            <Heading text="Index list:" tag={'h3'}/>
        </>
    );
};

export default observer(Teams);

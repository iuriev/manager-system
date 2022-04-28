import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";
import styles from "../styles/Navbar.module.scss";
import store from "../store";
import {observer} from "mobx-react-lite";

const navigation = [
    {id: 1, title: 'Players', path: '/'},
    {id: 2, title: 'Teams', path: '/teams'},
    {id: 3, title: 'Contacts', path: '/contacts'},
];

const Navbar = () => {
    const { pathname } = useRouter();
    const playersTitle = `${navigation[0].title} ( ${store.count})`;

    return (
        <nav className={styles.nav}>
            <div>
                <Image
                    alt="logo"
                    src="/images/vercel.svg"
                    width={60}
                    height={60}
                />
            </div>
            <div className={styles.links}>
                {navigation.map(({id, title, path}) => (
                    <Link key={id} href={path}>
                        <a className={pathname === path
                            ? styles.active
                            : ''}>
                            {   id === 1
                                ? playersTitle
                                : title
                            }
                        </a>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default  observer(Navbar);

import {configure, makeAutoObservable} from "mobx";
import {IPlayer} from "./types/types";

configure({
    enforceActions: "never", // State can be changed from anywhere.
});

class PlayersStore {
    player: IPlayer = {
        id: "",
        firstName: "",
        lastName: "",
        imageUrl: "",
        age: 0,
        position: "",
        group: "",
        date: new Date(),
    };
    filteredPlayers: IPlayer [] = [];
    players: IPlayer [] = [];
    groups: string[] = ['ALL', '2000', '2001', '2002', '2003'];

    constructor() {
        makeAutoObservable(this);
    }

    setPlayers = (players: IPlayer[]) => {
        this.players = players || [];
    };

    setPlayer = (player: IPlayer) => {
        this.player = player;
    };

    updatePlayer = (player: IPlayer) => {
        this.player = player;
        for (const x of this.players) {
            if (x.id === player.id) {
                x.firstName = player.firstName;
                x.lastName = player.lastName;
                x.imageUrl = player.imageUrl;
                x.age = player.age;
                x.position = player.position;
                x.group = player.group;
                x.date = player.date;
            }
        }
    };

    resetPlayer = () => {
        this.player = {
            id: "",
            firstName: "",
            lastName: "",
            imageUrl: "",
            age: 0,
            position: "",
            group: "",
            date: null,
        };
    };

    get count() {
        return this.players.length;
    }
}

const store = new PlayersStore();
export default store;

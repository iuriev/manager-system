import { configure, makeAutoObservable } from "mobx";
import {IPlayer} from "./types/types";
configure({
    enforceActions: "never",
});

class PlayersStore {
    player : IPlayer = {
        id: "",
        firstName: "",
        lastName: "",
        imageUrl: "",
        age: 0,
        position: "",

    };
    players : IPlayer [] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setPlayers = (players : IPlayer[]) => {
        this.players = players || [];
    };

    setPlayer = (player : IPlayer) => {
        this.player = player;
    };

    updatePlayer = (player : IPlayer) => {
        this.player = player;
        for (const x of this.players) {
            if (x.id === player.id) {
                x.firstName = player.firstName;
                x.lastName = player.lastName;
                x.imageUrl = player.imageUrl;
                x.age = player.age;
                x.position = player.position;
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
        };
    };

    get count() {
        return this.players.length;
    }
}

const store = new PlayersStore();
export default store;

import { configure, makeAutoObservable } from "mobx";
configure({
    enforceActions: "never",
});

class PlayersStore {
    player = {
        id: "",
        firstName: "",
        lastName: "",
        imageUrl: "",
        age: "",
        position: "",
        skills: "",
    };
    players = [];

    constructor() {
        makeAutoObservable(this);
    }

    setPlayers = (players) => {
        this.players = players || [];
    }

    setPlayer = player => {
        this.player = player;
    }

    updatePlayer = player => {
        this.player = player;
        for (const x of this.players) {
            if (x.id === player.id) {
                x.firstName = player.firstName;
                x.lastName = player.lastName;
                x.imageUrl = player.imageUrl;
                x.age = player.age;
                x.position = player.position;
                x.skills = player.position;
            }
        }
        this.resetPlayer();

    }

    resetPlayer = () => {
        this.player = {
            id: "",
            firstName: "",
            lastName: "",
            imageUrl: "",
            age: 0,
            position: "",
            skills: "",
        };
    }

    get count() {
        return this.players.length;
    }

    addPlayer(obj) {
        this.players.push(obj);
    }
}

const store = new PlayersStore();
export default store;

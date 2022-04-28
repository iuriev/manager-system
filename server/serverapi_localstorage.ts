import axios from "axios"

const KEY = "players";

class LocalStorageAPI {
    queryPlayers() {
        let value = localStorage.getItem(KEY);

        if (!value) {
            let url = "/static/players.json";
            axios.get(url)
                .then(reply => {
                    localStorage.setItem(KEY, JSON.stringify(reply.data));
                    return reply.data;
                });
        } else {
            return JSON.parse(value);
        }
    }

    getPlayer(id) {
        id = parseInt(id);
        let value = localStorage.getItem(KEY);
        let data = JSON.parse(value) || [];

        for (const x of data) {
            if (x.id == id) {
                return x;
            }
        }

        return false;

    }

    savePlayer(item) {
        let value = localStorage.getItem(KEY);
        let players = JSON.parse(value);

        if (!item.id) {
            // create object
            const seconds = Math.floor(Date.now() / 1000);
            item.id = seconds;
            players.push(item);
        } else {
            // edit object
            for (const x of players) {
                if (x.id == item.id) {
                    x.firstName = item.firstName;
                    x.lastName = item.lastName;
                    x.imageUrl = item.imageUrl;
                    x.age = item.age;
                    x.position = item.position;
                    x.skills = item.skills;
                }
            }
        }

        localStorage.setItem(KEY, JSON.stringify(players));
    }

    deletePlayer(id) {
        id = parseInt(id);

        let value = localStorage.getItem(KEY);
        let players = JSON.parse(value);

        players = players.filter(item => item.id !== id)
        localStorage.setItem(KEY, JSON.stringify(players));
    }
}

const api_mockup = new LocalStorageAPI();
export default api_mockup;


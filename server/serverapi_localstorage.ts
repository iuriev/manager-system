import axios from "axios";
import IPlayer from "../types/types";

const KEY = "players";

class LocalStorageAPI {
    queryPlayers() {
        const value = localStorage.getItem(KEY);

        if (!value) {
            const url = "/static/players.json";
            axios.get(url)
                .then(reply => {
                    localStorage.setItem(KEY, JSON.stringify(reply.data));
                    return reply.data;
                });
        } else {
            return JSON.parse(value);
        }
    }

    getPlayer(id : string) {
        const value : string | null = localStorage.getItem(KEY);
        
        if (value) {
            const data = JSON.parse(value) || [];

            for (const x of data) {
                if (x.id === id) {
                    return x;
                }
            }
            
        }
        
        return false;
    }

    savePlayer(item : IPlayer) {
        const value : string | null = localStorage.getItem(KEY);
        
        if (value) {
            const players : IPlayer[] = JSON.parse(value);

            if (!item.id) {
                item.id = Math.floor(Date.now() / 1000).toString();
                players.push(item);
            } else {
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
    }

    deletePlayer(id: string) {
        const value : string | null = localStorage.getItem(KEY);
        
        if (value) {
            let players : IPlayer[]= JSON.parse(value);

            players = players.filter(item => item.id !== id);
            localStorage.setItem(KEY, JSON.stringify(players)); 
        } 
        
    }
}

const api_mockup = new LocalStorageAPI();
export default api_mockup;


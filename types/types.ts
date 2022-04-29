export interface IPlayer {
    id: string
    firstName: string
    lastName: string
    age: number
    position: string
    imageUrl: string
    [key: string]: any;
}

export interface ITeam {
    id: string
    name: string
    position: number
    imageUrl: string
    foundation: number
    players: number[]
}

export enum POSITION {
    goalkeeper = "Goalkeeper",
    defender = "Defender",
    midfielder = "Midfielder",
    striker = "Striker",
}



export default interface IPlayer {
    id: string
    firstName: string
    lastName: string
    age: number
    position: string
    imageUrl: string
    [key: string]: any;
}

export enum POSITION {
    goalkeeper = "Goalkeeper",
    defender = "Defender",
    midfielder = "Midfielder",
    striker = "Striker",
}



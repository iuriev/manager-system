export default interface IPlayer {
    id: string
    firstName: string
    lastName: string
    age: number
    position: string
    skills: string[]
    imageUrl: string
}

export enum POSITION {
    goalkeeper = "Goalkeeper",
    defender = "Defender",
    midfielder = "Midfielder",
    striker = "Striker",
}



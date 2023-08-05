import { IUser } from "./user"

export interface ICompany {
    id?: string,
    name: string,
    description: string,
    users?: IUser[],
    units?: {
        name: string,
        assets?: {
            image: string,
            name: string,
            description: string,
            model: string,
            owner: string,
            status: string,
            health: string
        }[]
    }[]
}
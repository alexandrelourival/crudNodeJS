import { ObjectId } from 'mongodb'
import { IUnitRequest, IUnitResponse } from './unit'
import { IUser } from './user'

export interface ICompanyRequest {
    _id?: ObjectId,
    name: string,
    description: string,
    users?: IUser[],
    units?: IUnitRequest[]
}

export interface ICompanyResponse {
    _id?: ObjectId,
    name: string,
    description: string,
    users?: IUser[],
    units?: IUnitResponse[]
}
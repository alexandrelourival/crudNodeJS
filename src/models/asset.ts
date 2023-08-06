export interface IAssetRequest {
    image: string,
    name: string,
    description: string,
    model: string,
    owner: string,
    status: number,
    health: number
}

export interface IAssetResponse {
    image: string,
    name: string,
    description: string,
    model: string,
    owner: string,
    status: string,
    health: string
}
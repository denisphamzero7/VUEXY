
export interface Role {
    _id:string,
    name:string,
    isActive:boolean,
    description:string,
    permissions: string[]
}
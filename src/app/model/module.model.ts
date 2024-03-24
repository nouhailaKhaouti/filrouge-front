import { Concours } from "./councour.model"

export interface Module{
    coef:Number,
    reference:string
}


export interface ConcoursModule{
    concour:Concours
    reference:string
}
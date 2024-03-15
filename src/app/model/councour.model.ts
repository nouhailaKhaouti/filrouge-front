import { Module } from "./module.model"

export interface Concour{
    reference:string,
    anneeConcours:Number,
    dateConcoursEcrit:string,
    dateConcoursOral:string,
    nbreplace:Number,
    nbreplaceConcoursEcrit:Number,
    nbreplaceConcoursOral:Number
    filiere:Filiere
    niveau:string
    modules:Module[]
}

export interface Filiere{
    label:String
}
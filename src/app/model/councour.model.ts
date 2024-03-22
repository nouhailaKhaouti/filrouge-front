import { Departement } from "./departement.model"
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
    label:string
    departement:Departement
}

export interface Concours{
    reference:string,
    anneeConcours:Number,
    dateConcoursEcrit:string,
    dateConcoursOral:string,
    nbreplace:Number,
    nbreplaceConcoursEcrit:Number,
    nbreplaceConcoursOral:Number
}

export interface Reference{
    reference:string
}
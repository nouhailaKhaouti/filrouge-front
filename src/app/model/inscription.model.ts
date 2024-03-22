import {Reference } from "./councour.model";

export interface Diplome{
    refDiplome:string,
    anneeObtention: number,
    mention: string;
    note:number,
    semestres:Semestre[]
}

export interface Semestre{
    refSemestre:string,
    note:number,
}

export interface Choix{
    concour:Reference
}

export interface Inscription{
    cne:string;
    nom:string;
    prenom:string;
    cin:string;
    tel:string;
    email:string;
    niveau:string;
    AdressePersonnelle:string;
    dateNaissance:string;
    choixs:Choix[],
    diplomes:Diplome[],
}
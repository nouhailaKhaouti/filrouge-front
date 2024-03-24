import {Reference } from "./councour.model";
import { ResultInscription } from "./result.model";

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
export interface ChoixInscription{
    concour:Reference
    inscription:InscriptionWithCin
}

export interface ChoixResult{
    concour:Reference,
    result:ResultInscription
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

export interface InscriptionResult{
    cne:string;
    nom:string;
    prenom:string;
    cin:string;
    tel:string;
    email:string;
    niveau:string;
    AdressePersonnelle:string;
    dateNaissance:string;
    choixs:ChoixResult[],
    diplomes:Diplome[],
}

export interface InscriptionWithCin{
    cin:string;
    niveau:string;
}


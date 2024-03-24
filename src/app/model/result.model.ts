import { Choix, ChoixInscription } from "./inscription.model";

export interface Result{
    choix:ChoixInscription,
    noteModules:NoteModule[],
    noteOral:number
}

export interface ResultInscription{
    noteModules:NoteModule[],
    noteOral:number,
    noteWriting:number,
    notePreselection:number,
    preselectione:boolean,
    retenueOral:boolean,
    admis:boolean
}

export interface NoteModule{
    refModuleConcours:string,
    note:number

}
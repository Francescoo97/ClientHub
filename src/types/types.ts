import type { Dispatch } from "react";

export type ClientStatus = 'attivo' | 'disattivo'


export type Client = {
    id: number,
    nome: string,
    email: string,
    stato: ClientStatus,
    telefono: string,
    note?: string
}


export type ClientDetailsProps = {
    cliente: Client | null;
    modalOpen: boolean;
    modalClose: () => void;
    dispatch: Dispatch<Action>
}


export type HeaderProps = {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export type State = {
    listaClienti: Client[]
}


export type Action = 
    | {type: 'ADD_CLIENT', payload: Client}
    | {type: 'UPDATE_CLIENT', payload: {id: Client['id'], stato: Client['stato'], note: Client['note']}}
    | {type: 'DELETE_CLIENT', payload: Client['id']} 


export type KPICardProps = {
    titolo: string;
    valore: number;
    colore: string
}


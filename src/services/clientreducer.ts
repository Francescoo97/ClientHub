import type { State } from "../types/types";
import type { Action } from "../types/types";

export function reducer(state: State, action: Action): State {
    switch(action.type) {
        // Aggiunge nuovo cliente in fondo alla lista.
        case 'ADD_CLIENT':
            return{
                listaClienti: [...state.listaClienti, action.payload]
            };
            // Aggiorna stato e note del cliente con l'id corrispondente.
        case 'UPDATE_CLIENT':
            return{
                listaClienti: state.listaClienti.map((cliente) => 
                    cliente.id === action.payload.id ? {
                       ...cliente,
                       note: action.payload.note,
                       stato: action.payload.stato
                } : cliente)
            };
            // Filtra l'array e rimuove il cliente con l'id ccorrispondente.
        case 'DELETE_CLIENT':
            return{
                listaClienti: state.listaClienti.filter((cliente) => cliente.id !== action.payload)
            };
            // Lo stato resta invariato se l'action non è riconosciuta.
        default: 
            return state;
    }
} 
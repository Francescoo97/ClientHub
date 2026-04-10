import { useState } from "react"
import type { ClientDetailsProps } from "../types/types"
import {toast} from "react-hot-toast"

function ClientDetails({cliente, modalOpen, modalClose, dispatch}: ClientDetailsProps) {
    // STATI MODIFICA (STATO, CLIENTE E NOTE)
    const [modifica, setModifica] = useState<boolean>(false)

    let statoIniziale = ''
    if(cliente && cliente.stato) {
        statoIniziale = cliente.stato
    }
    const [newStato, setNewStato] = useState<'attivo' | 'disattivo'>(statoIniziale as 'attivo' | 'disattivo')

    let noteIniziale = ''
    if(cliente && cliente.note) {
        noteIniziale = cliente.note
    }
    const [newNote, setNewNote] = useState<string>(noteIniziale)
    
    // Se il modal è chiuso o nessun cliente è selezionato non renderizza niente.
    if(!modalOpen || !cliente) return null 

    // Salvataggio modifiche e chiusura modal.
    const handleSave = () => {
        dispatch({type: 'UPDATE_CLIENT', payload: {id: cliente.id, stato: newStato, note: newNote}})
        setModifica(false)
        modalClose()
        toast.success('Modifiche salvate!')
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">

                <h2>{cliente.nome}</h2>
                <p>Email: {cliente.email}</p>
                <p>Telefono: {cliente.telefono}</p>

                    {modifica ? (
                        // Modalità Modifica con relativi campi.
                        <>
                        <label>Stato:
                            <select
                            value={newStato}
                            onChange={e => setNewStato(e.target.value as 'attivo' | 'disattivo')}>
                                <option value="attivo">Attivo</option>
                                <option value="disattivo">Disattivo</option>
                            </select>
                        </label>

                        <label style={{display: 'block', marginTop:'1vh'}}>Note:
                            <textarea
                            value={newNote}
                            onChange={e => setNewNote(e.target.value)}>
                            </textarea>
                        </label>
                        </>
                    ) : (
                        // Mostra i dati del cliente.
                        <>
                           <p>Stato: {cliente.stato}</p>
                           <p>Note: {cliente.note ?? 'Nessuna nota'}</p>
                        </>
                    )}

                <div className="modal-buttons">
                    {modifica ? (
                        <button onClick={handleSave}>Salva</button>
                    ) : (
                    <button onClick={() => setModifica(true)}>Modifica</button>
                    )}
                    
                    <button onClick={() => {dispatch({type: 'DELETE_CLIENT', payload: cliente.id}); 
                     toast.success('Cliente eliminato!')}}>
                        Elimina</button>

                    <button onClick={modalClose}>Chiudi</button>
                </div>
            </div>
        </div>
    )
}

export default ClientDetails 
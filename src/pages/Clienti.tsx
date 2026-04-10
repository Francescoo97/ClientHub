import React, {  useState, type Dispatch } from 'react'
import type { Action, Client } from '../types/types'
import ClientDetails from '../components/ClientDetails'
import { toast } from 'react-hot-toast'

// Numero di utenti mostrati per pagina.
const UTENTI_PER_PAGINA = 10

function Clienti({listaClienti, dispatch}: {listaClienti: Client[], dispatch: Dispatch<Action>}) {

    const [pagina, setPagina] = useState<number>(1)
    const [clienteSelezionato, setClienteSelezionato] = useState<Client | null>(null)
    const [modal, setModal] = useState<boolean>(false)
    
    const [input, setInput] = useState<string>('')
    const [filtro,setFiltro] = useState<string>('')

    // Filtra la lista in base al testo cercato e stato selezionato, ricerca case-insensitive grazie a toLowerCase.
    const lista = listaClienti.filter((utente) => {
        const ricerca = 
        utente.nome.toLowerCase().includes(input.toLowerCase()) ||
        utente.email.toLowerCase().includes(input.toLowerCase())

    // Se filtro è vuoto mostra tutti, altrimenti filtra per stato.
        const matchFiltro = filtro === '' || utente.stato === filtro
        return ricerca && matchFiltro
    })

    // PAGINAZIONE
    const startIndex = (pagina - 1) * UTENTI_PER_PAGINA
    const endIndex = startIndex + UTENTI_PER_PAGINA
    const utentiPagina = lista.slice(startIndex, endIndex)
    const totPagine = Math.ceil(lista.length / UTENTI_PER_PAGINA)

    // FUNZIONI MODAL
    function openModal(cliente: Client) {
        setClienteSelezionato(cliente)
        setModal(true)
    }

    function closeModal() {
        setClienteSelezionato(null)
        setModal(false)
    }

    // Reset pagina a 1 ogni volta che l'utente cerca.
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
        setPagina(1)
    }

    return (
        <div className='clienti-container'>
            <div className='clienti-toolbar'>
               <input type="text" value={input} onChange={handleSearch} placeholder='Cerca...' /> 

            <select value={filtro} onChange={(e) => {
                setFiltro(e.target.value)
                setPagina(1)
            }}>
                <option value="">Tutti</option>
                <option value="attivo">Attivo</option>
                <option value="disattivo">Disattivo</option>
            </select>

            {/* Aggiunge nuovo cliente con dati generati automaticamente */}
            <button onClick={() => {
                const nuovoIndex = listaClienti.length + 1

                dispatch({type: 'ADD_CLIENT', payload:{
                    id: Date.now(),
                    nome: `Cliente ${nuovoIndex}`,
                    email: `cliente${nuovoIndex}@example.com`,
                    telefono: `+39 320 00000${String(Date.now()).slice(-6)}`,
                    stato: Math.random() < 0.5 ? 'attivo' : 'disattivo',
                    note: nuovoIndex % 3 === 0 ? `Nota per il cliente ${nuovoIndex}` : undefined,
                }
            });
            toast.success('Nuovo cliente aggiunto!')
        }} >
            Aggiungi
           </button>
        </div>

            <table className='clienti-table'>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Stato</th>
                        <th>Azioni</th>
                    </tr>
                </thead>

                <tbody>

                  {utentiPagina.length === 0 ? (
                  <tr><td colSpan={4} className='clienti-nessun-risultato'>Nessun risultato trovato!</td></tr>
                ) : (
                   utentiPagina.map((utente: Client) => (
                    <tr key={utente.id}>
                       <td>{utente.nome}</td>
                       <td>{utente.email}</td>
                       <td>{utente.stato}</td>
                       <td>
                        <button className='btn-dettagli' onClick={() => openModal(utente)}>Dettagli</button>
                       </td>
                    </tr>
                ))
            )}
                </tbody>
            </table>

            {/* Paginazione */}
            <div className='clienti-paginazione'>
                <button className='btn-paginazione-precedente'
                onClick={() => setPagina(pagina - 1)} disabled={pagina === 1}>
                Precedente 
                </button>

                <span>Pagina {pagina} di {totPagine}</span>

                <button className='btn-paginazione-successiva'
                  onClick={() => setPagina(pagina + 1)} disabled={pagina === totPagine}>
                  Successiva
                </button>
            </div>

            {/* Modal dettagli cliente, se nessun cliente è selezionato è null */}
            <ClientDetails
              cliente={clienteSelezionato}
              modalOpen={modal}
              modalClose={closeModal}
              dispatch={dispatch}
            />
        </div>
    )
}

export default Clienti 
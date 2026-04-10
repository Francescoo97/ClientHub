import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./components/style.css"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Clienti from "./pages/Clienti"
import { useEffect, useReducer, useState } from "react"
import { reducer } from "./services/clientreducer"
import type { State } from "./types/types"
import { Toaster } from "react-hot-toast"

// Stato iniziale con 20 clienti generati automaticamente come dati mock; in app reale verrebbero da un'API.
const initialState: State = {
  // Loop generatore di utenti
  listaClienti: Array.from({length: 20}, (_, i) => ({
    id: i + 1,
    nome: `Cliente ${i + 1}`,
    email: `cliente${i + 1}@example.com`,
    stato: Math.random() < 0.5 ? 'attivo' : 'disattivo',
    telefono: `+39 320 00000${String(i + 1).padStart(2, '0')}`,
    note: i % 3 === 0 ? `Nota per il cliente ${i + 1}` : undefined,
  }))
}

function App() {
  // TOGGLE LIGHT/DARK MODE
  const [darkMode, setDarkMode] = useState<boolean>(false)

  // Operazioni (Aggiungi, Modifica, Elimina) gestite con useReducer per avere maggiore organizzazione.
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect (() => {
        if(darkMode) {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
        // Stato Dark Mode salvato su LocalStorage
        localStorage.setItem('darkMode', darkMode.toString())
    }, [darkMode])

  return (
  <div className="app-wrapper">
    <Toaster position="top-center" />
    <Router>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="app-body">
      <Sidebar />
      <div className="app-content">
      <Routes>
        <Route path="/" element={<Dashboard listaClienti={state.listaClienti} />} />
        <Route path="/clienti" element={<Clienti listaClienti={state.listaClienti} dispatch={dispatch} />} />
      </Routes>
      </div>
      </div>
    </Router>
  </div>
  )
}

export default App 
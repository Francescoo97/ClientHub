import type { HeaderProps } from "../types/types"

function Header({darkMode, setDarkMode}: HeaderProps) {

    return (
        <header>
            <h1>ClientHub</h1>
            
            {/* Toggle light/dark mode che aggiorna lo stato in App.tsx */}
            <button onClick={() => setDarkMode(prev => !prev)}>
                {darkMode ? 'Light mode' : 'Dark mode'}
            </button>
        </header>
    )
}

export default Header 
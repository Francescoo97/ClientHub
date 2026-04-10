import type { KPICardProps } from "../types/types"

function KPICard({titolo, valore, colore}: KPICardProps) {
    
    return(
        <div className="kpi-card" style={{backgroundColor: colore}}>
            <h3>{titolo}</h3>
            <p>{valore}</p>
        </div>
    )
}

export default KPICard 
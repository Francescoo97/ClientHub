import KPICard from "../components/KPICard";
import type { State } from "../types/types";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";


 function Dashboard({ listaClienti }: State) {
  // CALCOLA KPI
  const attivi = listaClienti.filter(c => c.stato === "attivo").length;
  const persi = listaClienti.filter(c => c.stato === "disattivo").length;

  // Variabili cumulative per costruire il grafico, vengono incrementate dentro .map per mostrare l'andamento.
  let cumulAttivi = 0, cumulPersi = 0, cumulTot = 0, cumulNote = 0;
  
  const data = [...listaClienti]
    .sort((a, b) => a.id - b.id)
    .map(c => {
      cumulTot++
      if (c.stato === "attivo") cumulAttivi++;
      if (c.stato === "disattivo") cumulPersi++;
      if (c.note) cumulNote++;
      return {
        name: `C${c.id}`,
        attivo: cumulAttivi,
        perso: cumulPersi,
        totale: cumulTot,
        conNote: cumulNote,
      };
    });

  return (
    <div className="dashboard-container">
      <h2>Dashboard Clienti</h2>

      {/* KPI Card */}
      <div className="kpi-grid">
        <KPICard titolo="Attivi" valore={attivi} colore="#00C49F" />
        <KPICard titolo="Persi" valore={persi} colore="#FF4C4C" />
        <KPICard titolo="Totale" valore={listaClienti.length} colore="#6366f1" />
        <KPICard titolo="Clienti con Note" valore={cumulNote} colore="#FACC15" />
      </div>

      {/* Line Chart che mostra andamento dei clienti per categoria.*/}
      <div className="chart-wrapper">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="attivo" stroke="#00C49F" />
            <Line type="monotone" dataKey="perso" stroke="#FF4C4C" />
            <Line type="monotone" dataKey="totale" stroke="#FACC15" />
            <Line type="monotone" dataKey="conNote" stroke="#A78BFA" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard 
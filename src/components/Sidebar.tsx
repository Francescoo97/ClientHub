import { NavLink } from "react-router-dom"

function Sidebar() {
    
    return (
        <div className="sidebar">
            <aside>

                <h3>Menù</h3>

                <nav>
                    <ul>
                        <li>
                            <NavLink to='/' end>Dashboard</NavLink>
                        </li>

                        <li>
                            <NavLink to='/clienti'>Clienti</NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    )
}

export default Sidebar 
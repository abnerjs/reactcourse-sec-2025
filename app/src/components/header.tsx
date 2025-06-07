import ifspIcon from '../assets/ifsp-icon.svg'
import NavLink from './nav-link'

const Header = () => {
  return (
    <header className="flex items-center gap-5 py-2">
      <img src={ifspIcon} alt="Ícone IFSP" />

      <nav className="flex items-center gap-5">
        <NavLink href="/eventos">Eventos</NavLink>
        <NavLink href="/participantes">Participantes</NavLink>
      </nav>
    </header>
  )
}

export default Header

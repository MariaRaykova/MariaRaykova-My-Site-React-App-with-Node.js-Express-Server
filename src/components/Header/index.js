import { NavLink } from 'react-router-dom'
import './index.scss'
import ButtonDark from '../ButtonDark'
import ButtonLight from '../ButtonLight'



const Header = () => {
    return (

        <header className="site-header">
            <div className="content-limiter">
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul id="menu">
                        <li><NavLink activeClassName="nav-link-selected" to="/">Home</NavLink></li>
                        <li><NavLink activeClassName="nav-link-selected" to="/catalog">Catalog</NavLink></li>
                        <li><NavLink activeClassName="nav-link-selected" to="/contact">Contact</NavLink></li>
                        <li><NavLink activeClassName="nav-link-selected" to="/about">About</NavLink></li>
                    </ul>
                </div>
                <section className="logo">
                    <div className="logo-nd">
                        New Desire
           </div>
                    <div className="logo-boutique">
                        Boutique
           </div>
                </section>
                <nav>

                    <ul>
                        <li><NavLink activeClassName="nav-link-selected" to="/">Home</NavLink></li>
                        <li><NavLink activeClassName="nav-link-selected" to="/catalog">Catalog</NavLink></li>
                        <li><NavLink activeClassName="nav-link-selected" to="/contact">Contact</NavLink></li>
                        <li><NavLink activeClassName="nav-link-selected" to="/about">About</NavLink></li>
                    </ul>

                </nav>

                <div className="header-buttons">

                    <i className="fa fa-search"></i>

                    <ButtonDark />
                    <ButtonLight />
                </div>
            </div>
        </header>
    )
}
export default Header
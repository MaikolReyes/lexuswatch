import { getFirestore } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { getAllCategories } from '../queries';
import { CartContext } from "../context/CartContext";
import logo from '../assets/img/lexus.png';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {

    const { getTotalProducts } = useContext(CartContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        getAllCategories(db)
            .then((item) => {
                setCategories(item)
            })
    }, []);


    return (
        <div className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <button className='navbar-toggler' type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id="navbarNav">
                    <div>
                        <NavLink to='/' >
                            <img className='logo' src={logo} alt="Bootstrap" width="120" height="120" />
                        </NavLink>
                    </div>
                    <ul className='navbar-nav'>
                        <NavLink className='nav-link' to='/'>Inicio</NavLink>

                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categorias
                            </Link>

                            <ul className="dropdown-menu">
                                {
                                    categories?.map(({ marca, id }) => (
                                        <Link className="nav-link" to={`/category/${marca}`} key={id}>
                                            <li className='nav-item dropdown-item' key={id}>{marca}</li>
                                        </Link>
                                    ))}
                            </ul>
                        </li>

                        <NavLink className='nav-link nav-item' to='/papa'>Empresa</NavLink>
                        <NavLink className='nav-link' to='/pan'>Contacto</NavLink>
                        <NavLink className='nav-link' to='cart'><i className="fa-solid fa-cart-shopping"><h4 className='quantityProducts'>{getTotalProducts()}</h4></i></NavLink>

                    </ul>
                </div>
            </div>
        </div>
    )
}

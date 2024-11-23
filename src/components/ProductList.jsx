import { getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../queries';

export const ProductList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        getAllProducts(db)
            .then((item) => {
                setProducts(item)
            })
    }, []);

    return (
        <>
            <div className='position'>
                {
                    products?.map(({ id, images, name, stock }) => (
                        <div className='card' key={id}>
                            {images && <img alt="imagen" className='image' src={images} />}
                            <div className='card-body'>
                                <h5 className='card-title'>{name}</h5>
                                <p className='card-stock'>Stock Disponible: {stock}</p>
                                <Link className='btn btn-primary' to={`/product/${id}`}> Comprar </Link>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    )
}
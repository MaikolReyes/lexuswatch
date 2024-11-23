import { getFirestore } from 'firebase/firestore';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { getProductById } from '../queries';
import { CartContext } from "../context/CartContext";
import ItemCount from "../context/ItemCount"

export const Product = () => {
    const { id } = useParams();

    const [product, setProduct] = useState({});

    const { addItem } = useContext(CartContext);
    const [contador, setContador] = useState(0);

    useEffect(() => {
        const db = getFirestore();
        getProductById(db, id)
            .then((item) => {
                setProduct(item);
            });
    }, [id]);

    const onAdd = (quantity) => {
        setContador(quantity)
        addItem(product, quantity)
    }

    return (
        <div className='position-product'>
            {product?.images && <img alt="imagen" className='image-product' src={product.images} />}
            <div className='card-body-product' key={product?.id}>
                <h5 className='card-title-product'>{product?.name}</h5>
                <p className='card-stock'>
                    Stock Disponible: {product?.stock}
                </p>
                <p className='card-text'>
                    {product?.price}
                </p>
                <ItemCount stock={product?.stock ?? 0} initial={1} onAdd={onAdd} />
                <p className='cantidad'>Cantidad Agregada: {contador}</p>
            </div>
        </div>
    );

}
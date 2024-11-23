import { getFirestore, } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getProductsByCategory } from '../queries/Products';
import { Link } from 'react-router-dom';

export const Category = () => {
  const { id } = useParams();
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    getProductsByCategory(db, id)
      .then((item) => {
        setMarcas(item)
      })
  }, [id]);

  return (
    <div className='position'>
      {
        marcas?.map(({ images, name, stock, id }) => (
          <div className='card' key={name}>
            {images && <img alt="imagen" className='image' src={images} />}
            <div className='card-body'>
              <h5 className='card-title'>{name}</h5>
              <p className='card-stock'>Stock Disponible: {stock}</p>
              <Link className='btn btn-primary' to={`/product/${id}`}> Comprar </Link>
            </div>
          </div>
        ))
      }
    </div>
  )
}

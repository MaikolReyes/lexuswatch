import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { collection, addDoc, getFirestore } from 'firebase/firestore';

export const Cart = () => {
    const { productCartList, removeItem, clearCart, getTotalPrice } = useContext(CartContext);
    const [orderId, setOrderId] = useState('');

    // Crear estados para los inputs
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    const sendOrder = (event) => {

        event.preventDefault();

        const order = {
            client: {
                name,
                surname,
                email,
                number
            },
            items: productCartList,
            total: getTotalPrice(),
            date: new Date()
        }

        const db = getFirestore()

        const queryRef = collection(db, "orders");

        addDoc(queryRef, order)
            .then(resp => {
                setOrderId(resp.id);
                console.log("Order saved with ID: ", resp.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });


    }

    return (
        <div>
            {!orderId ?
                <div>
                    <h2 className='carritoElement'>Carrito:</h2>
                    <div className='carritoElement'>
                        {
                            productCartList.map(({ id, quantity, images, name, price, description }) => {
                                return (
                                    <div className='itemEnCarrito card' key={id}>
                                        <p className='cantidad'>Cantidad De Items: {quantity}</p>
                                        <img src={images} height="100px" className='producto' alt={description} />
                                        <p className='producto'>{name}</p>
                                        <p className='precio'>${price}</p>
                                        <div className='removerButton'>
                                            <button onClick={() => removeItem(id)} className='remover btn btn-danger'>Remover producto</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        productCartList.length > 0 ?
                            <div className='total'>
                                <div className='elementoCentrado'>
                                    <h3 className='carritoElement'>Total: ${getTotalPrice()}</h3>
                                    <button onClick={() => clearCart()} className='carritoElement btn btn-primary'>Vaciar carrito</button>
                                </div>


                                <div className='elementoCentrado'>
                                    <form className='formValidation' onSubmit={sendOrder}>
                                        <fieldset className='fieldsetValidation'>
                                            <legend><strong>Enviar pedido:</strong></legend>
                                            <div>
                                                <label htmlFor="nombre">Nombre:</label>
                                                <input
                                                    type="text"
                                                    className='form-control'
                                                    name="name"
                                                    id='name'
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="nombre">Apellido:</label>
                                                <input
                                                    type="text"
                                                    name="surname"
                                                    className='form-control'
                                                    id='surname'
                                                    value={surname}
                                                    onChange={(e) => setSurname(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email">Email:</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className='form-control'
                                                    id='email'
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="numero">Número de telefono:</label>
                                                <input
                                                    type="number"
                                                    name="number"
                                                    className='form-control'
                                                    id='number'
                                                    value={number}
                                                    onChange={(e) => setNumber(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <input type="submit" value="Finalizar Compra" className="btn btn-primary" />
                                            <input type="reset" value="Borrar" className="btn btn-primary" />
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                            :
                            <div className='elementoCentrado'>
                                <p className='carritoElement'>El carrito está vacío</p>
                                <Link to='/' className='carritoElement'><button className='btn btn-secondary'>Ver productos</button></Link>
                            </div>
                    }
                </div>
                :
                <h3>Tu orden ha sido registrada! ID: {orderId}</h3>
            }
        </div>
    )
}
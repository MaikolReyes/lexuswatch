import { useState } from "react";
import PropTypes from "prop-types";

const ItemCount = ({ stock, initial, onAdd }) => {

    const [count, setCount] = useState(initial);

    const sumar = () => {
        if (count < stock) {
            setCount(count + 1);
        } else {
            setCount(1)
        }
    }

    const restar = () => {
        if (count > 1) {
            setCount(count - 1);
        }
        else {
            setCount(0)
        }
    }

    return (
        <>
            <div className="counterContainer">
                <div className="counter">
                    <button className="btn btn-primary" onClick={restar}><h4>-</h4></button>
                    <div className="itemCount">{count}</div>
                    <button className="btn btn-primary" onClick={sumar}><h4>+</h4></button>
                </div>
                <button className="btn btn-primary" onClick={() => onAdd(count)}>Agregar al carrito</button>
            </div>
        </>
    );
}

ItemCount.propTypes = {
    stock: PropTypes.number.isRequired,
    initial: PropTypes.number.isRequired,
    onAdd: PropTypes.func.isRequired,
};

export default ItemCount;
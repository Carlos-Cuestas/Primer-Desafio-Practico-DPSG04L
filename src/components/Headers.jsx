"use client"
import { useState } from 'react';

export const Headers = ({
    allProducts,
    setAllProducts,
    total,
    countProducts,
    setCountProducts,
    setTotal,
}) => {
    const [active, setActive] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const onDeleteProduct = product => {
        const results = allProducts.filter(
            item => item.id !== product.id
        );

        setTotal(total - product.price * product.quantity);
        setCountProducts(countProducts - product.quantity);
        setAllProducts(results);
    };

    const onCleanCart = () => {
        if (window.confirm('Estas seguro de que deseas vaciar el carrito?')) {
            setAllProducts([]);
            setTotal(0);
            setCountProducts(0);
            setSuccessMessage('Carrito vacio con exito');
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    return (
        <header>
            <img src="./images/logogamer.png" alt="" />
            <h1>GamerShop</h1>

            <div className='container-icon'>
                <div className='container-cart-icon'
                    onClick={() => setActive(!active)}
                >
                    <img src="./images/carritoicono.png"
                        alt="carrito"
                        className="icon-cart" />

                    <div className='count-products'>
                        <span id='contador-productos'>{countProducts}</span>
                    </div>
                </div>

                <div
                    className={`container-cart-products ${active ? '' : 'hidden-cart'
                        }`}>
                    {allProducts.length ? (
                        <>
                            <div className='row-product'>
                                {allProducts.map(product => (
                                    <div className='cart-product'
                                        key={product.id}>

                                        <div className='info-cart-product'>
                                            <table>
                                                <tr>
                                                    <td><img
                                                        src={product.urlImage}
                                                        alt="cerrar"
                                                        className="icon-close"
                                                        onClick={() => onDeleteProduct(product)}
                                                    /></td>

                                                    <td><p className='titulo-producto-carrito'>
                                                        {product.title}
                                                    </p>
                                                        <span className='precio-producto-carrito'>
                                                            ${product.price}
                                                        </span></td>

                                                    <td><span className='cantidad-producto-carrito'>
                                                        {product.quantity}
                                                    </span></td>
                                                </tr>
                                            </table>



                                        </div>


                                    </div>
                                ))}
                            </div>

                            <div className='cart-total'>
                                <h3>Total:</h3>
                                <span className='total-pagar'>${total}</span>
                            </div>

                            <button className='btn-clear-all'
                                onClick={onCleanCart}>
                                Vaciar Carrito
                            </button>
                        </>
                    ) : (
                        <p className='cart-empty'>El carrito está vacío</p>
                    )}
                </div>
            </div>

            {successMessage && <div className='success-message'>{successMessage}</div>}
        </header>
    );
};

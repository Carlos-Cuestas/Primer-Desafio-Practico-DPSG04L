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

    const onDeleteProduct = (product, quantityToRemove) => {
        if (quantityToRemove <= 0) return; // No permitir eliminar cantidad no positiva

        const productInCart = allProducts.find(item => item.id === product.id);
        if (productInCart) {
            const newQuantity = productInCart.quantity - quantityToRemove;

            if (newQuantity <= 0) {
                // Elimina el producto si la nueva cantidad es 0 o menos
                const results = allProducts.filter(item => item.id !== product.id);
                setAllProducts(results);
            } else {
                // Actualiza la cantidad del producto
                const results = allProducts.map(item =>
                    item.id === product.id ? { ...item, quantity: newQuantity } : item
                );
                setAllProducts(results);
            }

            // Actualiza el total y la cuenta de productos
            setTotal(total - product.price * quantityToRemove);
            setCountProducts(countProducts - quantityToRemove);
        }
    };

    const onCleanCart = () => {
        if (window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
            setAllProducts([]);
            setTotal(0);
            setCountProducts(0);
            setSuccessMessage('Carrito vacío con éxito');
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

                                            <img
                                                src={product.urlImage}
                                                alt="cerrar"
                                                className="icon-close"
                                                onClick={() => onDeleteProduct(product, product.quantity)}
                                            />

                                            <p className='titulo-producto-carrito'>
                                                {product.title}
                                            </p>
                                            <span className='precio-producto-carrito'>
                                                ${product.price.toFixed(2)}
                                            </span>

                                            <span className='cantidad-producto-carrito'>
                                                Cantidad:
                                                {product.quantity}
                                            </span>


                                            <input
                                                type="number"
                                                min="1"
                                                max={product.quantity}
                                                defaultValue={1}
                                                id={`quantity-${product.id}`}
                                                style={{ width: '70px', marginLeft: '10px' }}
                                            />
                                            <br />
                                            <button
                                                onClick={() => {
                                                    const quantityToRemove = parseInt(document.getElementById(`quantity-${product.id}`).value, 10);
                                                    onDeleteProduct(product, quantityToRemove);
                                                }}
                                            >
                                                Eliminar
                                            </button>


                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='cart-total'>
                                <h3>Total:</h3>
                                <span className='total-pagar'>${total.toFixed(2)}</span>
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

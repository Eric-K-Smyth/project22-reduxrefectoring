import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  updateProducts,
  updateCartQuantity,
} from '../slices/productsSlice';

import Cart from '../components/Cart';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const { cart } = useSelector((state) => state.products);

  useEffect(() => {
    if (data) {
      dispatch(updateProducts(data.products));
    } else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch(updateProducts(indexedProducts));
      });
    }
  }, [data, loading, dispatch]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch(
        updateCartQuantity({
          _id: id,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        })
      );
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch(
        addToCart({
          ...currentProduct,
          purchaseQuantity: 1,
        })
      );
      idbPromise('cart', 'put', {
        ...currentProduct,
        purchaseQuantity: 1,
      });
    }
  };

  const removeFromCart = () => {
    dispatch(removeFromCart(currentProduct._id));
    idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img src={`/images/${currentProduct.image}`} alt={currentProduct.name} />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;

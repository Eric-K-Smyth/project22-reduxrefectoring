import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { addToCart, updateCartQuantity } from '../../utils/actions';
import { pluralize } from "../../utils/helpers";

function ProductItem({ item, cart, addToCart, updateCartQuantity }) {
  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      updateCartQuantity(_id, parseInt(itemInCart.purchaseQuantity) + 1);
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      addToCart({ ...item, purchaseQuantity: 1 });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = {
  addToCart,
  updateCartQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);


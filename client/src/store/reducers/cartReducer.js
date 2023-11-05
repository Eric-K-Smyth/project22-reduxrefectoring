import {
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    UPDATE_CART_QUANTITY,
  } from '../utils/actions';
  
  const initialState = {
    cart: [],
  };
  
  export default function cartReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_TO_CART:
        // When a product is added to the cart, check if it's already in the cart.
        // If it is, increase the quantity; otherwise, add it as a new item.
        const newItem = action.product;
        const existingItem = state.cart.find((item) => item._id === newItem._id);
  
        if (existingItem) {
          // Increase the quantity of the existing item
          existingItem.purchaseQuantity += 1;
          return {
            ...state,
            cart: [...state.cart],
          };
        } else {
          // Add the new item to the cart
          newItem.purchaseQuantity = 1;
          return {
            ...state,
            cart: [...state.cart, newItem],
          };
        }
  
      case ADD_MULTIPLE_TO_CART:
        // Handle the case where multiple products are added to the cart
        return {
          ...state,
          cart: [...state.cart, ...action.products],
        };
  
      case REMOVE_FROM_CART:
        // Remove a product from the cart based on its _id
        const updatedCart = state.cart.filter((item) => item._id !== action._id);
        return {
          ...state,
          cart: updatedCart,
        };
  
      case CLEAR_CART:
        // Clear the entire cart
        return {
          ...state,
          cart: [],
        };
  
      case UPDATE_CART_QUANTITY:
        // Update the quantity of a specific product in the cart
        const updatedCartItems = state.cart.map((item) => {
          if (item._id === action._id) {
            item.purchaseQuantity = action.purchaseQuantity;
          }
          return item;
        });
        return {
          ...state,
          cart: updatedCartItems,
        };
  
      default:
        return state;
    }
  }
  
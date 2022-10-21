import React from "react";
import CartItem from "./CartItem";
import "./Cart.css";
import { useSelector } from "react-redux";

const CartItems = () => {
  const cartitem = useSelector((state) => state.cart.itemsList)
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <ul>
       {cartitem.map((item) => (
         <li key={item.id}>
           <CartItem  quantity={item.quantiti} id={item.id} price={item.price} total={item.totalPrice} name={item.name} />
         </li>
       ))}
      </ul>
    </div>
  );
};

export default CartItems;

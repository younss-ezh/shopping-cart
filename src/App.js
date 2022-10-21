import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import { fetchData, sendCartData } from "./components/cart-actions";
import Layout from "./components/Layout";
import Notification from './components/Notification' ;
import { uiActions } from "./store/ui-slice";

let isRender = true ;

function App() {
  const dispatch = useDispatch() ;
  const notification = useSelector(state => state.ui.notification)
  const cart = useSelector(state => state.cart) ;

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  useEffect(() => {
    if(isRender){
      isRender = false
      return
    }
    
    if (cart.changed) {
      dispatch(sendCartData(cart))
    }
    
  }, [cart, dispatch]);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
 

  return (
    <div className="App">
       { notification && (<Notification type={notification.type} message={notification.message} />) }
      { !isLoggedIn && <Auth />}
     { isLoggedIn && <Layout />}
    </div>
  );
}

export default App;

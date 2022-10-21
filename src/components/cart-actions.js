import { cartActions } from "../store/cart-slice"
import { uiActions } from "../store/ui-slice"

export const  fetchData = () => {
    return async (dispatch) => {
        const fetchHandler = async () => {
            const res = await fetch('https://shopping-redux-ceb41-default-rtdb.firebaseio.com/cartItems.json')
            const data = await res.json() ;
            return data ;
        }

            try { 
                const cartData = await fetchHandler() ;
                dispatch(cartActions.replaceData(cartData))
            } catch {
                dispatch(uiActions.showNotification({
                    open: true,
                    message: 'Sending Request To Fetch Data Failed',
                    type: 'error'
                  }))
            }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            open: true,
            message: 'Sending Request',
            type: 'warning'
          }))

          const sendRequest = async () => {
     
            const res = await fetch('https://shopping-redux-ceb41-default-rtdb.firebaseio.com/cartItems.json', {
              method: 'PUT',
              body: JSON.stringify(cart)
            })
            const data = await res.json() ;
              // Sending State As Request
            dispatch(uiActions.showNotification({
              open: true,
              message: 'Sending Request to DataBase Successfully',
              type: 'success'
            }))
          }
          try {
            await sendRequest() ;
          } catch(err) {
            dispatch(uiActions.showNotification({
                open: true,
                message: 'Sending Request Failed',
                type: 'error'
              }))
          }
    }
}
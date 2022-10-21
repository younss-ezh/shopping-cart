import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        totalQuantiti: 0,
        showCart: false,
        changed: false,
    },
    reducers: {
        replaceData(state, action) {
            state.totalQuantiti = action.payload.totalPrice ;
            state.itemsList = action.payload.itemsList ;
        } ,
        addToCart(state, action) {
            state.changed = true
            const newItem = action.payload

            const existingItem = state.itemsList.find(item => item.id === newItem.id)

            if(existingItem) {
                existingItem.quantiti++
                existingItem.totalPrice += newItem.price 
            }else {
                state.itemsList.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantiti: 1,
                    totalPrice: newItem.price,
                    name: newItem.name
                })

                state.totalQuantiti++
            }
        },
        removeFromCart(state, action) {
            state.changed = true
            const id = action.payload

            const existingItem = state.itemsList.find(item => item.id === id)

            if(existingItem.quantiti === 1) {
                state.itemsList = state.itemsList.filter(item => item.id !== id)
                state.totalQuantiti--
            }else {
                existingItem.quantiti--
                existingItem.totalPrice -= existingItem.price 
            }
        },
        setShowCart(state) {
            state.showCart = !state.showCart
        }
    }
})

export const cartActions = cartSlice.actions

export default cartSlice ;
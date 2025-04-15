import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};
const cartSlice = createSlice ({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const exitem = state.items.find(
                (item) => item.id === action.payload.id);
            if (exitem) {
                exitem.quantity += 1;
            } else {
                state.items.push({...action.payload, quantity: 1});
            }
        },
        
    },
}); 

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;
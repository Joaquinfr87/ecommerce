import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    items: [], 
    filteredItems: [], 
    searchTerm: "",
    selectedCategory: "All",    
  };
const filterProduct =  (state)=>{
    return state.items.filter((product)=>{
        const matchSearch=product.titulo.toLowerCase().includes(state.searchTerm.toLowerCase());
        const matchCategory=state.selectedCategory === "All" || product.categoria === state.selectedCategory;
        return matchSearch && matchCategory;
    });
};
const productSlice=createSlice({
    name: "products",
    initialState,
    reducers:{
        setProducts: (state, action) => {
            state.items = action.payload;
            state.filteredItems = filterProduct(state);
          },
        setSearchTerm: (state,action)=>{
            state.searchTerm = action.payload    ;
            state.filteredItems = filterProduct(state);
        },
        setSelectedCategory:(state,action)=>{
            state.selectedCategory = action.payload;
            state.filteredItems = filterProduct(state);
        },
    },
});
export const {setProducts,setSearchTerm,setSelectedCategory} = productSlice.actions;
export default productSlice.reducer;
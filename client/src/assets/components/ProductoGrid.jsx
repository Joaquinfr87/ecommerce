import React from 'react'

import ProductoCard from './ProductoCard'
import { useSelector } from 'react-redux'
export default function ProductoGrid() {
  const productos = useSelector((state)=>state.product.filteredItems);
  
  
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 my-24'>
      {productos.map((producto)=>{
        return <ProductoCard key={producto.id} producto={producto}/> 
      })}
    </div>
  )
}

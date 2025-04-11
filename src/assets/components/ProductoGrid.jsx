import React from 'react'
import productos from '../../productoContenido'
import ProductoCard from './ProductoCard'
export default function ProductoGrid() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 my-24'>
      {productos.map((producto)=>{
        return <ProductoCard key={producto.id} producto={producto}/> 
      })}
    </div>
  )
}

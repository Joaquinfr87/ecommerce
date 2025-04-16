import { Link } from "react-router-dom"; 
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state)=>state.cart.items);

  const total = cartItems.reduce((sum,item)=>sum+item.precio*item.quantity,0);

  if(cartItems.length===0){
    return <div className="container mx-auto px-4 py-8">
      <div className="text-center ">
        <h2>
          El carrito esta vacio
        </h2>
        <p className=" text-gray-600 mb-4">Añade algunos productos para verlos aqui</p>
        <Link to="/" className="inline-block bg-zinc-200 px-6 py-2 rounded-lg hover:bg-zinc-300">Continue a Inicio</Link>
      </div>
    </div>
  }
  return (
    <div className="mx-auto container px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Carrito de Compra</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 shadow-md p-4 rounded-md"></div>
        <div className="lg:col-span-1 ">
          <div className="shadow-md bg-white p-6 rounded-md">
            <h3 className="text-xs font-bold mb-4">Resumen de pedido</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Sub Total</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between">
                <span>Envio</span>
                <span>Gratis</span>
              </div>
              <div className="border-t pt-2 font-bold">
                <span>Envio</span>
                <span>Gratis</span>
              </div>
            </div>
            <button className="w-full bg-zinc-200 px-6 py-3 rounded-lg hover:bg-zinc-300">Proceder a verificar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

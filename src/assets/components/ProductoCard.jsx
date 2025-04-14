import React from "react";
import { Link } from "react-router-dom";

export default function ProductoCard({producto}) {
  return (
    <Link>
      <div className="shadow-lg rounded-md cursor-pointer mx-5 ">
        <img src={producto.imageURL} className="w-full h-48 object-cover"/>
        <div className="bg-gray-50 p-4 ">
            <h2 className="text-lg font-semibold my-4">
                {producto.titulo.substring(0, 25)+"..."}
            </h2>
            <p className="text-zinc-500 border-b-2 :"> {producto.descripcion.substring(0, 75)+"..."}</p>
            <div className="flex justify-between mt-4 items-center">
                <p className="text-xl font-semibold">${producto.precio}</p>
                <p>Ver Detalle</p>
            </div>
        </div>
      </div>
    </Link>
  );
}

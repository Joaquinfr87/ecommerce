import {  ShoppingCart } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchTerm } from "../../features/products/ProductSlice";

export default function NavBar() {

  const dispatch = useDispatch();
  const Searchterm = useSelector((state) => state.product.searchTerm);

  return (
    <>
      
      <nav className="sticky top-0 z-50 flex justify-between items-center container mx-auto py-5 md:py-6 px-2 bg-gray-50 mt-1.5 border border-gray-200 rounded-xl shadow-sm">
        <div className="hidden md:flex items-center ">
          <a
            href="/"
            className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 hover:scale-105 transition-transform duration-300"
          >
            TODO BICI Y MOTO
          </a>
        </div>
        <form className="w-full sm:block md:w-1/2">
          <input
            type="text"
            placeholder="Buscar productos"
            className="bg-zinc-100 rounded-md border border-zinc-300 focus:outline-none p-3 w-full"
            value={Searchterm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
        </form>
        <Link to={"/cart"}>
          <ShoppingCart
            size={50}
            className="cursor-pointer  bg-gray-200 py-3 px-4 rounded-full"
          />
        </Link>
      </nav>
    </>
  );
}

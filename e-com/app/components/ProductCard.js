"use client"

import Image from "next/image";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";
import {Heart, HeartCrack, ShoppingBag, ShoppingCart} from 'lucide-react';

export default function ProductCard({product}){

    const dispatch = useDispatch();
    const {id, title, price, image, category} = product;

    function addToCartHandler(){

        // This triggers the addItem logic in cartSlice.js
        dispatch(cartActions.addItem({
            id,
            title,
            price,
        }))
        console.log("Item was successfully added to the cart")
    }

    return (
        <div className="group bg-white rounded-xl border border-gray-100 p-4 transition-all hover:shadow-xl relative">
            {/*Wishlist Icon */}
            <button className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors"><Heart className="w-5 h-5"/></button>

            {/*Product Image */}
            <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg">
                <Image 
                    src={image}
                    alt={title}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            {/*Product Info */}
            <div className="space-y-2">
                <span className="text-xs font-medium text-orange-600 uppercase tracking-wider">{category}</span>
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{title}</h3>

                <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-bold text-gray-900">${price}</span>
                    <button 
                        onClick={addToCartHandler}
                        className="flex items-center gap-2 bg-gray-900 text-white px-2 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                    >
                        <ShoppingCart />
                        Add to Cart
                    </button>
                </div>
            </div>

        </div>
    )

}
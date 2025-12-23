import Link from "next/link";
import {ShoppingCart, Heart, User, Search, Menu, SearchAlert} from 'lucide-react'; // Using lucide-react for icons

export default function Navbar(){
    return (
        <nav className="border-b bg-white sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/*Logo*/}
                <Link 
                    href="/" 
                    className="text-2xl font-bold text-orange-600 flex items-center gap-1"
                >
                    BuzzCart
                </Link>
                {/*Desktop Links*/}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
                    <Link href="/">Home</Link>
                    <Link href="/shop">Shop</Link>
                    <Link href="/shop?cat=smartwatch">Smartwatch</Link>
                    <Link href="/shop?cat=accessories">Accessories</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                </div>
                {/*Logo*/}
                <div className="flex items-center gap-4">
                    <Search className="w-5 h-5 cursor-pointer text-gray-600" />
                    <Link href="/wishlist">
                        <Heart className="w-5 h-5 text-gray-600" />
                    </Link>
                    <Link href="/account">
                        <User className="w-5 h-5 text-gray-600" />
                    </Link>
                    <Link href="/cart" className="relative">
                        <ShoppingCart className="w-5 h-5 text-gray-600" />
                        <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                        0
                        </span>
                    </Link>
                    <Menu className="md:hidden w-6 h-6" />
                </div>
                <button></button>
            </div>
        </nav>
    )
}
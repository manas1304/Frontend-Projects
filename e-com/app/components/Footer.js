import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer(){
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-6 mt-auto">
            <div className="container mx-auto px-4 text-center">
                {/* Newsletter Section */}
                <h3 className="text-xl font-semibold mb-2">Join Our Newsletter</h3>
                <p className="text-gray-400 text-sm mb-6">Get updates on latest shop deals and offers.</p>
                <div className="flex max-w-md mx-auto mb-10">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="flex-1 px-4 py-2 text-white outline-none rounded-l placeholder-white border border-white"
                    />
                    <button className="bg-orange-600 px-6 py-2 rounded-r font-medium hover:bg-orange-700">
                        Subscribe
                    </button>
                </div>
                <hr className="border-gray-800 mb-8" />
                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-4">
                        <FaFacebook className="w-5 h-5 cursor-pointer hover:text-orange-500" />
                        <FaTwitter className="w-5 h-5 cursor-pointer hover:text-orange-500" />
                        <FaInstagram className="w-5 h-5 cursor-pointer hover:text-orange-500" />
                        <FaLinkedin className="w-5 h-5 cursor-pointer hover:text-orange-500" />
                    </div>
                    <p className="text-gray-500 text-xs">
                        © 2025 BuzzCart. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
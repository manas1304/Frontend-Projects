import Link from 'next/link';

export default function LandingPage() {
 return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
        {/**Simple Headers */}
        <nav className="p-6 flex justify-between items-center bg-white shadow-sm">
            <h1 className="text-2xl font-bold text-blue-600">CRM Pro</h1>
            <div className="space-x-4">
                <Link href='/login' className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
                <Link href='/signup' className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Get Started</Link>
            </div>
        </nav>

        {/**Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
                Support Management <span className="text-blue-600">Simplified.</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mb-10">
                The all-in-one platform for <b>CUSTOMERS</b> to raise tickets, <b>ENGINEERS</b> to solve problems, 
                and <b>ADMINS</b> to manage everything seamlessly.
            </p>
            <div className="flex gap-4">
                <Link href="/signup" className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg transition">
                    Start for Free
                </Link>
                <Link href="/login" className="bg-white border text-gray-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-50 transition">
                    View Demo
                </Link>
            </div>
            {/**Features Preview */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="font-bold text-lg mb-2">Role Based Access</h3>
                    <p className="text-sm text-gray-500 text-center">Customized views for Admins, Engineers, and Customers.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="font-bold text-lg mb-2">Real-time Updates</h3>
                    <p className="text-sm text-gray-500 text-center">Track ticket status changes instantly across the board.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="font-bold text-lg mb-2">User Management</h3>
                    <p className="text-sm text-gray-500 text-center">Easily approve or suspend users with one click.</p>
                </div>
            </div>
        </main>
        <footer className="p-6 text-center text-gray-400 text-sm border-t bg-white">
            © 2026 CRM Pro. Built for efficiency.
        </footer>
    </div>
 )
}

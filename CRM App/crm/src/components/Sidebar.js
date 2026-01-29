"use client"
import {useState, useEffect} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

export default function Sidebar(){
    const pathname = usePathname();
    const [role, setRole] = useState('');

    useEffect(() =>{
        const userType = localStorage.getItem('userType');
        if(userType){
            setRole(userType.toLowerCase());
        }
    }, []); // Empty dependency array means the will run once on mounting phase

    const navLinks = {
        admin: [
            {name: 'Dashboard', path: '/admin'},
            {name: 'Manage Users', path: '/admin/users'},
            {name: 'All Tickets', path: '/admin/tickets'},
            {name: 'Profile', path: '/profile'}
        ],
        engineer: [
            {name: 'Dashboard', path: '/engineer'},
            {name: 'Assigned Tickets', path: '/engineer/tickets'},
            {name: 'Profile', path: '/profile'}
        ],
        customer: [
            {name: 'Dashboard', path: '/customer'},
            {name: 'My Tickets', path: '/customer/tickets'},
            {name: 'Create Ticket', path: '/customer?create=true'},
            {name: 'Profile', path: '/profile'}
        ]
    }

    const links = navLinks[role] || [];

    return (
        <aside className="w-64 bg-slate-800 text-white flex flex-col">
            <div className="p-6 text-2xl font-bold border-b border-slate-800">CRM Pro</div>
            <nav className="flex-1 p-4">
                {
                    links.map((link) =>(
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`block p-3 mb-2 rounded transition ${
                                pathname === link.path ? 'bg-blue-600':'hover:bg-gray-400'
                            } `}
                        >
                            {link.name}
                        </Link>
                    ))
                }
            </nav>
        </aside>
    )
}